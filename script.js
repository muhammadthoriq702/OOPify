let blocksInWorkspace = [];
let currentDraggedBlock = null;
let offsetX = 0;
let offsetY = 0;
const trashBin = document.getElementById("trash-bin");

const SNAP_DISTANCE = 10;


let zoomLevel = 1;

document.addEventListener("mouseup", () => {
  if (currentDraggedBlock) {
    const workspace = document.getElementById("workspace-content");
    const trashBinRect = trashBin.getBoundingClientRect();
    const draggedRect = currentDraggedBlock.getBoundingClientRect();

    if (draggedRect.right > trashBinRect.left && draggedRect.left < trashBinRect.right && draggedRect.bottom > trashBinRect.top && draggedRect.top < trashBinRect.bottom) {
      currentDraggedBlock.remove();
      blocksInWorkspace = blocksInWorkspace.filter((block) => block.element !== currentDraggedBlock);
      trashBin.classList.remove("active");
      currentDraggedBlock = null;
      return;
    }

    const blocks = Array.from(workspace.querySelectorAll(".block"));
    let snapped = false;

    for (const block of blocks) {
      if (block === currentDraggedBlock) continue;
    
      const blockConfig = blocksInWorkspace.find(b => b.element === block);
      const currentConfig = blocksInWorkspace.find(b => b.element === currentDraggedBlock);
    
      if (!blockConfig.snapConfig) continue;
    
      const blockRect = block.getBoundingClientRect();
      const draggedRect = currentDraggedBlock.getBoundingClientRect();
    
      const distanceRight = Math.abs(draggedRect.left - blockRect.right);
      const distanceBottom = Math.abs(draggedRect.top - blockRect.bottom);
    
      let snapped = false;
    
      // Snap to the right if enabled
      if (blockConfig.snapConfig.right && distanceRight <= SNAP_DISTANCE &&
          draggedRect.bottom > blockRect.top && draggedRect.top < blockRect.bottom) {
        currentDraggedBlock.style.left = `${block.offsetLeft + block.offsetWidth + blockConfig.snapConfig.offsets.right.x}px`;
        currentDraggedBlock.style.top = `${block.offsetTop + blockConfig.snapConfig.offsets.right.y}px`;
        snapped = true;
      }
    
      // Snap to the bottom if enabled
      if (blockConfig.snapConfig.bottom && distanceBottom <= SNAP_DISTANCE &&
          draggedRect.right > blockRect.left && draggedRect.left < blockRect.right) {
        currentDraggedBlock.style.left = `${block.offsetLeft + blockConfig.snapConfig.offsets.bottom.x}px`;
        currentDraggedBlock.style.top = `${block.offsetTop + block.offsetHeight + blockConfig.snapConfig.offsets.bottom.y}px`;
        snapped = true;
      }
    
      if (snapped) break;
    }
    
    

    if (!snapped) {
      const left = parseFloat(currentDraggedBlock.style.left) || 0;
      const top = parseFloat(currentDraggedBlock.style.top) || 0;
      currentDraggedBlock.style.left = `${Math.max(left, 0)}px`;
      currentDraggedBlock.style.top = `${Math.max(top, 0)}px`;
    }

    currentDraggedBlock = null;
  }
});

document.addEventListener("DOMContentLoaded", () => {
  showContent("class");
  
  // Set the first item to active initially
  const sidebarItems = document.querySelectorAll(".sidebar ul li");
  if (sidebarItems.length > 0) {
    sidebarItems[0].classList.add("active");
  }

  // Add click event to all sidebar items
  sidebarItems.forEach((item) => {
    item.addEventListener("click", () => {
      // Remove 'active' class from all items
      sidebarItems.forEach((i) => i.classList.remove("active"));
      // Add 'active' class to the clicked item
      item.classList.add("active");
    });
  });

  document.querySelectorAll("[class^='block-option']").forEach((blockOption) => {
    const img = blockOption.dataset.img;
    blockOption.style.backgroundImage = `url('images/${img}')`;

    blockOption.addEventListener("dragstart", (event) => {
      ["type", "img", "width", "height"].forEach((key) => {
        event.dataTransfer.setData(key, blockOption.dataset[key]);
      });
    });
  });

  document.getElementById("workspace-content").addEventListener("dragover", (event) => {
    event.preventDefault();
  });

  document.getElementById("workspace-content").addEventListener("drop", (event) => {
    event.preventDefault();
  
    const type = event.dataTransfer.getData("type");
    const img = event.dataTransfer.getData("img");
    const width = event.dataTransfer.getData("width");
    const height = event.dataTransfer.getData("height");
  
    const blockOption = document.querySelector(`[data-img="${img}"]`);
  
    const snapConfig = {
      right: blockOption.dataset.snapRight === "true",
      bottom: blockOption.dataset.snapBottom === "true",
      offsets: {
        right: {
          x: parseFloat(blockOption.dataset.snapRightX) || 0,
          y: parseFloat(blockOption.dataset.snapRightY) || 0,
        },
        bottom: {
          x: parseFloat(blockOption.dataset.snapBottomX) || 0,
          y: parseFloat(blockOption.dataset.snapBottomY) || 0,
        },
      },
    };
  
    const block = createPNGBlock(type, img, width, height);
    const workspaceRect = document.getElementById("workspace-content").getBoundingClientRect();
    block.style.top = `${(event.clientY - workspaceRect.top + window.scrollY) / zoomLevel}px`;
    block.style.left = `${(event.clientX - workspaceRect.left + window.scrollX) / zoomLevel}px`;
  
    blocksInWorkspace.push({
      element: block,
      type,
      content: "",
      children: [],
      snapConfig,
    });
  
    document.getElementById("workspace-content").appendChild(block);
  });
  
  

  document.getElementById("create-input-block").addEventListener("click", createInputBlock);
});


function createPNGBlock(type, img, width, height) {
  const block = document.createElement("div");
  block.className = `block block-${type}`;
  block.style.backgroundImage = `url('images/${img}')`;
  block.style.width = `${width}px`;
  block.style.height = `${height}px`;

  block.addEventListener("mousedown", (event) => {
    currentDraggedBlock = block;
    const workspaceRect = document.getElementById("workspace-content").getBoundingClientRect();
    offsetX = event.clientX - block.getBoundingClientRect().left;
    offsetY = event.clientY - block.getBoundingClientRect().top;
    block.style.cursor = "grabbing";
  });

  return block;
}

function createInputBlock() {
  const inputName = document.getElementById("input-name").value;

  if (inputName.trim() === "") {
    alert("Please enter a valid name!");
    return;
  }

  const block = document.createElement("div");
  block.className = "inputan";
  block.textContent = inputName;
  block.style.height = "12px";
  block.style.color = "black";
  block.style.fontFamily = "Arial, sans-serif";
  block.style.fontSize = "8px";
  block.style.borderRadius = "8px";
  block.style.display = "flex";
  block.style.justifyContent = "center";
  block.style.alignItems = "center";
  block.style.position = "absolute";
  block.style.cursor = "grab";
  block.style.boxSizing = "border-box";
  block.style.textAlign = "center";
  block.style.padding = "5px";
  block.style.overflowWrap = "break-word";
  block.style.border = "1px solid black";
  block.style.backgroundColor = "white";
  block.style.paddingLeft = "5px";
  block.style.paddingRight = "5px";
  block.style.zIndex = "1000";

  const workspaceRect = document.getElementById("workspace-content").getBoundingClientRect();
  block.style.top = `${10 / zoomLevel}px`;
  block.style.left = `${10 / zoomLevel}px`;

  block.addEventListener("mousedown", (event) => {
    currentDraggedBlock = block;
    const workspaceRect = document.getElementById("workspace-content").getBoundingClientRect();
    offsetX = event.clientX - block.getBoundingClientRect().left;
    offsetY = event.clientY - block.getBoundingClientRect().top;
    block.style.cursor = "grabbing";
  });

  const resizeHandle = document.createElement("div");
  resizeHandle.className = "resize-handle";
  resizeHandle.style.width = "8px";
  resizeHandle.style.height = "100%";
  resizeHandle.style.position = "absolute";
  resizeHandle.style.right = "0";
  resizeHandle.style.top = "0";
  resizeHandle.style.background = "linear-gradient(45deg, #ff7e5f, #feb47b)";
  resizeHandle.style.cursor = "e-resize";
  resizeHandle.style.borderRadius = "4px";
  resizeHandle.style.transition = "background 0.3s, transform 0.3s";

  resizeHandle.addEventListener("mouseover", () => {
    resizeHandle.style.background = "linear-gradient(45deg, #4facfe, #00f2fe)";
    resizeHandle.style.transform = "scaleX(1.2)";
  });

  resizeHandle.addEventListener("mouseout", () => {
    resizeHandle.style.background = "linear-gradient(45deg, #ff7e5f, #feb47b)";
    resizeHandle.style.transform = "scaleX(1)";
  });

  resizeHandle.addEventListener("mousedown", (e) => {
    e.stopPropagation();
    let isResizing = true;
    const workspaceRect = document.getElementById("workspace-content").getBoundingClientRect();
    const initialWidth = block.offsetWidth * zoomLevel;
    const initialMouseX = (e.clientX - workspaceRect.left) / zoomLevel;

    document.addEventListener("mousemove", resizeBlock);
    document.addEventListener("mouseup", stopResize);

    function resizeBlock(event) {
      if (isResizing) {
        const currentMouseX = (event.clientX - workspaceRect.left) / zoomLevel;
        const deltaX = currentMouseX - initialMouseX;
        block.style.width = `${Math.max(50, initialWidth + deltaX)}px`;
      }
    }

    function stopResize() {
      isResizing = false;
      document.removeEventListener("mousemove", resizeBlock);
      document.removeEventListener("mouseup", stopResize);
    }
  });

  block.appendChild(resizeHandle);
  document.getElementById("workspace-content").appendChild(block);
  document.getElementById("input-name").value = "";
}

document.addEventListener("mousemove", (event) => {
  if (currentDraggedBlock) {
    const workspaceRect = document.getElementById("workspace-content").getBoundingClientRect();
    const x = event.clientX - workspaceRect.left - offsetX;
    const y = event.clientY - workspaceRect.top - offsetY;

    currentDraggedBlock.style.left = `${x / zoomLevel}px`;
    currentDraggedBlock.style.top = `${y / zoomLevel}px`;

    const trashBinRect = trashBin.getBoundingClientRect();
    const blockRect = currentDraggedBlock.getBoundingClientRect();

    if (blockRect.right > trashBinRect.left && blockRect.left < trashBinRect.right && blockRect.bottom > trashBinRect.top && blockRect.top < trashBinRect.bottom) {
      trashBin.classList.add("active");
    } else {
      trashBin.classList.remove("active");
    }
  }
});

function showContent(type) {
  document.querySelectorAll(".content-item").forEach((item) => item.classList.remove("active"));
  document.getElementById(type).classList.add("active");
}

document.getElementById("zoom-in").addEventListener("click", () => {
  if (zoomLevel < 2) {
    zoomLevel += 0.1;
    document.getElementById("workspace-content").style.transform = `scale(${zoomLevel})`;
  }
});

document.getElementById("zoom-out").addEventListener("click", () => {
  if (zoomLevel > 0.5) {
    zoomLevel -= 0.1;
    document.getElementById("workspace-content").style.transform = `scale(${zoomLevel})`;
  }
});

document.getElementById("zoom-reset").addEventListener("click", () => {
  zoomLevel = 1;
  document.getElementById("workspace-content").style.transform = "scale(1)";
});
