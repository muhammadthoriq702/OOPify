let blocksInWorkspace = [];
let currentDraggedBlock = null;
let offsetX = 0;
let offsetY = 0;
const trashBin = document.getElementById("trash-bin");

const SNAP_DISTANCE = 10; // Jarak toleransi untuk snap (dalam pixel)

// Offset untuk snap ke kanan dan bawah
const SNAP_OFFSETS = {
  right: { x: -11, y: 0 }, // Offset untuk snap ke kanan
  bottom: { x: 0, y: -16 }, // Offset untuk snap ke bawah
};

document.addEventListener("mouseup", () => {
  if (currentDraggedBlock) {
    const workspace = document.getElementById("workspace-content");
    const trashBinRect = trashBin.getBoundingClientRect();
    const draggedRect = currentDraggedBlock.getBoundingClientRect();

    // Jika blok berada di trash bin, jangan snap
    if (
      draggedRect.right > trashBinRect.left &&
      draggedRect.left < trashBinRect.right &&
      draggedRect.bottom > trashBinRect.top &&
      draggedRect.top < trashBinRect.bottom
    ) {
      return;
    }

    const blocks = Array.from(workspace.querySelectorAll(".block"));
    let snapped = false;

    for (const block of blocks) {
      if (block === currentDraggedBlock) continue;

      const blockRect = block.getBoundingClientRect();
      const distanceRight = Math.abs(draggedRect.left - blockRect.right);
      const distanceBottom = Math.abs(draggedRect.top - blockRect.bottom);

      // Snap ke kanan dengan offset khusus
      if (
        distanceRight <= SNAP_DISTANCE &&
        draggedRect.bottom > blockRect.top &&
        draggedRect.top < blockRect.bottom
      ) {
        currentDraggedBlock.style.left = `${
          block.offsetLeft + block.offsetWidth + SNAP_OFFSETS.right.x
        }px`;
        currentDraggedBlock.style.top = `${
          block.offsetTop + SNAP_OFFSETS.right.y
        }px`;
        snapped = true;
        break;
      }

      // Snap ke bawah dengan offset khusus
      if (
        distanceBottom <= SNAP_DISTANCE &&
        draggedRect.right > blockRect.left &&
        draggedRect.left < blockRect.right
      ) {
        currentDraggedBlock.style.left = `${
          block.offsetLeft + SNAP_OFFSETS.bottom.x
        }px`;
        currentDraggedBlock.style.top = `${
          block.offsetTop + block.offsetHeight + SNAP_OFFSETS.bottom.y
        }px`;
        snapped = true;
        break;
      }
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

document.addEventListener("DOMContentLoaded", function () {
  // Memanggil showContent untuk menampilkan konten terkait dengan 'class' pada awal halaman
  showContent("class");

  // Menambahkan kelas 'active' pada elemen pertama (li) setelah halaman dimuat
  const firstItem = document.querySelector(".sidebar ul li");
  if (firstItem) {
    firstItem.classList.add("active");
  }
});

function changeColor(element) {
  // Hapus kelas 'active' dari semua item list di sidebar
  const items = document.querySelectorAll(".sidebar ul li");
  items.forEach((item) => item.classList.remove("active"));

  // Tambahkan kelas 'active' pada elemen yang diklik
  element.classList.add("active");
}

document.querySelectorAll(".block-option").forEach((blockOption) => {
  const img = blockOption.dataset.img;
  blockOption.style.backgroundImage = `url('images/${img}')`;

  blockOption.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("type", blockOption.dataset.type);
    event.dataTransfer.setData("img", img);
    event.dataTransfer.setData("width", blockOption.dataset.width);
    event.dataTransfer.setData("height", blockOption.dataset.height);
  });
});

document.querySelectorAll(".block-option-class").forEach((blockOption) => {
  const img = blockOption.dataset.img;
  blockOption.style.backgroundImage = `url('images/${img}')`;

  blockOption.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("type", blockOption.dataset.type);
    event.dataTransfer.setData("img", img);
    event.dataTransfer.setData("width", blockOption.dataset.width);
    event.dataTransfer.setData("height", blockOption.dataset.height);
  });
});

document
  .getElementById("workspace-content")
  .addEventListener("dragover", (event) => {
    event.preventDefault();
  });

document.querySelectorAll(".block-option-datatype").forEach((blockOption) => {
  const img = blockOption.dataset.img;
  blockOption.style.backgroundImage = `url('images/${img}')`;

  blockOption.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("type", blockOption.dataset.type);
    event.dataTransfer.setData("img", img);
    event.dataTransfer.setData("width", blockOption.dataset.width);
    event.dataTransfer.setData("height", blockOption.dataset.height);
  });
});

document.querySelectorAll(".block-option-connector").forEach((blockOption) => {
  const img = blockOption.dataset.img;
  blockOption.style.backgroundImage = `url('images/${img}')`;

  blockOption.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("type", blockOption.dataset.type);
    event.dataTransfer.setData("img", img);
    event.dataTransfer.setData("width", blockOption.dataset.width);
    event.dataTransfer.setData("height", blockOption.dataset.height);
  });
});

document.querySelectorAll(".block-option-modifier").forEach((blockOption) => {
  const img = blockOption.dataset.img;
  blockOption.style.backgroundImage = `url('images/${img}')`;

  blockOption.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("type", blockOption.dataset.type);
    event.dataTransfer.setData("img", img);
    event.dataTransfer.setData("width", blockOption.dataset.width);
    event.dataTransfer.setData("height", blockOption.dataset.height);
  });
});

document.querySelectorAll(".block-option-method").forEach((blockOption) => {
  const img = blockOption.dataset.img;
  blockOption.style.backgroundImage = `url('images/${img}')`;

  blockOption.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("type", blockOption.dataset.type);
    event.dataTransfer.setData("img", img);
    event.dataTransfer.setData("width", blockOption.dataset.width);
    event.dataTransfer.setData("height", blockOption.dataset.height);
  });
});

document
  .querySelectorAll(".block-option-constructor")
  .forEach((blockOption) => {
    const img = blockOption.dataset.img;
    blockOption.style.backgroundImage = `url('images/${img}')`;

    blockOption.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("type", blockOption.dataset.type);
      event.dataTransfer.setData("img", img);
      event.dataTransfer.setData("width", blockOption.dataset.width);
      event.dataTransfer.setData("height", blockOption.dataset.height);
    });
  });

document.querySelectorAll(".block-option-condition").forEach((blockOption) => {
  const img = blockOption.dataset.img;
  blockOption.style.backgroundImage = `url('images/${img}')`;

  blockOption.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("type", blockOption.dataset.type);
    event.dataTransfer.setData("img", img);
    event.dataTransfer.setData("width", blockOption.dataset.width);
    event.dataTransfer.setData("height", blockOption.dataset.height);
  });
});

document.querySelectorAll(".block-option-miniclass").forEach((blockOption) => {
  const img = blockOption.dataset.img;
  blockOption.style.backgroundImage = `url('images/${img}')`;

  blockOption.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("type", blockOption.dataset.type);
    event.dataTransfer.setData("img", img);
    event.dataTransfer.setData("width", blockOption.dataset.width);
    event.dataTransfer.setData("height", blockOption.dataset.height);
  });
});

document
  .querySelectorAll(".block-option-operational")
  .forEach((blockOption) => {
    const img = blockOption.dataset.img;
    blockOption.style.backgroundImage = `url('images/${img}')`;

    blockOption.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("type", blockOption.dataset.type);
      event.dataTransfer.setData("img", img);
      event.dataTransfer.setData("width", blockOption.dataset.width);
      event.dataTransfer.setData("height", blockOption.dataset.height);
    });
  });

document.querySelectorAll(".block-option-control").forEach((blockOption) => {
  const img = blockOption.dataset.img;
  blockOption.style.backgroundImage = `url('images/${img}')`;

  blockOption.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("type", blockOption.dataset.type);
    event.dataTransfer.setData("img", img);
    event.dataTransfer.setData("width", blockOption.dataset.width);
    event.dataTransfer.setData("height", blockOption.dataset.height);
  });
});

function createInputBlock() {
  const inputName = document.getElementById("input-name").value;

  if (inputName.trim() === "") {
    alert("Please enter a valid name!");
    return;
  }

  const block = document.createElement("div");
  block.className = "inputan";
  block.textContent = inputName;

  // Styling dasar
  block.style.height = "12px";
  block.style.backgroundColor = "#29e";
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

  let isDragging = false;
  let isResizing = false;
  let offsetX = 0;
  let offsetY = 0;
  let initialWidth = 0;
  let initialMouseX = 0;

  // Drag logic
  block.addEventListener("mousedown", (e) => {
    if (e.target.classList.contains("resize-handle")) {
      return; // Jangan mulai drag saat resize
    }
    isDragging = true;
    currentDraggedBlock = block;
    offsetX = e.offsetX;
    offsetY = e.offsetY;
    block.style.cursor = "grabbing";
  });

  document.addEventListener("mousemove", (e) => {
    if (isDragging && !isResizing) {
      const workspaceRect = workspace.getBoundingClientRect();
      let x = e.clientX - workspaceRect.left - offsetX;
      let y = e.clientY - workspaceRect.top - offsetY;

      // Batas pergerakan dalam workspace
      x = Math.max(0, Math.min(x, workspaceRect.width - block.offsetWidth));
      y = Math.max(0, Math.min(y, workspaceRect.height - block.offsetHeight));

      block.style.left = `${x}px`;
      block.style.top = `${y}px`;
    }

    if (currentDraggedBlock) {
      const workspaceRect = workspace.getBoundingClientRect();
      currentDraggedBlock.style.left = `${
        (event.clientX - workspaceRect.left - offsetX) / zoomLevel
      }px`;
      currentDraggedBlock.style.top = `${
        (event.clientY - workspaceRect.top - offsetY) / zoomLevel
      }px`;

      const trashBinRect = trashBin.getBoundingClientRect();
      const blockRect = currentDraggedBlock.getBoundingClientRect();

      if (
        blockRect.right > trashBinRect.left &&
        blockRect.left < trashBinRect.right &&
        blockRect.bottom > trashBinRect.top &&
        blockRect.top < trashBinRect.bottom
      ) {
        trashBin.classList.add("active");
      } else {
        trashBin.classList.remove("active");
      }
    }

    if (isResizing) {
      const deltaX = e.clientX - initialMouseX;

      // Hanya mengubah lebar (width)
      block.style.width = `${Math.max(50, initialWidth + deltaX)}px`;
    }
  });

  document.addEventListener("mouseup", () => {
    if (isDragging) {
      isDragging = false;
      block.style.cursor = "grab";
      currentDraggedBlock = null;
    }
    if (isResizing) {
      isResizing = false;
    }
  });

  // Resize logic (Horizontal only)
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

  // Tambahkan animasi
  resizeHandle.style.transition = "background 0.3s, transform 0.3s";

  // Tambahkan efek hover
  resizeHandle.addEventListener("mouseover", () => {
    resizeHandle.style.background = "linear-gradient(45deg, #4facfe, #00f2fe)";
    resizeHandle.style.transform = "scaleX(1.2)";
  });

  resizeHandle.addEventListener("mouseout", () => {
    resizeHandle.style.background = "linear-gradient(45deg, #ff7e5f, #feb47b)";
    resizeHandle.style.transform = "scaleX(1)";
  });

  resizeHandle.addEventListener("mousedown", (e) => {
    e.stopPropagation(); // Hentikan event bubbling agar tidak memicu drag
    isResizing = true;
    initialWidth = block.offsetWidth;
    initialMouseX = e.clientX;
  });

  block.appendChild(resizeHandle);

  document.getElementById("workspace-content").appendChild(block);
  document.getElementById("input-name").value = ""; // Clear input field
}

document
  .getElementById("workspace-content")
  .addEventListener("drop", (event) => {
    event.preventDefault();

    // Ambil data elemen dari drag
    const type = event.dataTransfer.getData("type");
    const img = event.dataTransfer.getData("img");
    const width = event.dataTransfer.getData("width");
    const height = event.dataTransfer.getData("height");

    // Jika elemen di-drop di atas elemen lain, tetap tambahkan ke workspace
    let dropTarget = event.target;
    if (dropTarget.id !== "workspace-content") {
      dropTarget = document.getElementById("workspace-content"); // Set target drop menjadi workspace
    }

    // Buat block baru
    const block = createPNGBlock(type, img, width, height);

    // Hitung posisi relatif di dalam workspace
    const workspaceRect = dropTarget.getBoundingClientRect();
    block.style.top = `${event.clientY - workspaceRect.top}px`;
    block.style.left = `${event.clientX - workspaceRect.left}px`;

    // Tambahkan elemen ke workspace
    blocksInWorkspace.push({ element: block, type, content: "", children: [] });
    dropTarget.appendChild(block);
  });

// Function to create a new block based on type and image
function createPNGBlock(type, img, width, height) {
  const block = document.createElement("div");

  // Add the general 'block' class
  block.className = "block";

  // Dynamically add a class based on the type (e.g., block-connector, block-class, etc.)
  if (type) {
    block.classList.add(`block-${type}`); // Adds block-connector, block-class, etc.
  }

  // Set the background image and size for the block
  block.style.backgroundImage = `url('images/${img}')`;
  block.style.width = `${width}px`;
  block.style.height = `${height}px`;

  // Add the 'mousedown' event to allow dragging
  block.addEventListener("mousedown", (event) => {
    currentDraggedBlock = block;
    offsetX = event.offsetX;
    offsetY = event.offsetY;
  });

  return block;
}

// Modify the drop event listener
document
  .getElementById("workspace-content")
  .addEventListener("drop", (event) => {
    event.preventDefault();

    // Get data from the drag event
    const type = event.dataTransfer.getData("type");
    const img = event.dataTransfer.getData("img");
    const width = event.dataTransfer.getData("width");
    const height = event.dataTransfer.getData("height");

    // Set the drop target to the workspace if necessary
    let dropTarget = event.target;
    if (dropTarget.id !== "workspace-content") {
      dropTarget = document.getElementById("workspace-content");
    }

    // Calculate the relative position inside the workspace
    const workspaceRect = dropTarget.getBoundingClientRect();
    block.style.top = `${event.clientY - workspaceRect.top}px`;
    block.style.left = `${event.clientX - workspaceRect.left}px`;

    // Add the block to the workspace
    blocksInWorkspace.push({ element: block, type, content: "", children: [] });
    dropTarget.appendChild(block);
  });

document
  .getElementById("workspace-content")
  .addEventListener("mousemove", (event) => {
    if (currentDraggedBlock) {
      const workspaceRect = document
        .getElementById("workspace-content")
        .getBoundingClientRect();
      currentDraggedBlock.style.left = `${
        event.clientX - workspaceRect.left - offsetX
      }px`;
      currentDraggedBlock.style.top = `${
        event.clientY - workspaceRect.top - offsetY
      }px`;

      const trashBinRect = trashBin.getBoundingClientRect();
      const blockRect = currentDraggedBlock.getBoundingClientRect();

      if (
        blockRect.right > trashBinRect.left &&
        blockRect.left < trashBinRect.right &&
        blockRect.bottom > trashBinRect.top &&
        blockRect.top < trashBinRect.bottom
      ) {
        trashBin.classList.add("active");
      } else {
        trashBin.classList.remove("active");
      }
    }
  });

document.addEventListener("mouseup", () => {
  if (currentDraggedBlock) {
    const trashBinRect = trashBin.getBoundingClientRect();
    const blockRect = currentDraggedBlock.getBoundingClientRect();

    if (
      blockRect.right > trashBinRect.left &&
      blockRect.left < trashBinRect.right &&
      blockRect.bottom > trashBinRect.top &&
      blockRect.top < trashBinRect.bottom
    ) {
      currentDraggedBlock.remove();
      blocksInWorkspace = blocksInWorkspace.filter(
        (block) => block.element !== currentDraggedBlock
      );
    }

    trashBin.classList.remove("active");
    currentDraggedBlock = null;
  }
});

function showContent(type) {
  document
    .querySelectorAll(".content-item")
    .forEach((item) => item.classList.remove("active"));
  document.getElementById(type).classList.add("active");
}

let zoomLevel = 1; // Default zoom level
const zoomStep = 0.1;
const minZoom = 0.5;
const maxZoom = 2;
const workspaceContent = document.getElementById("workspace-content");

document.getElementById("zoom-in").addEventListener("click", () => {
  if (zoomLevel < maxZoom) {
    zoomLevel += zoomStep;
    updateZoom();
  }
});

document.getElementById("zoom-out").addEventListener("click", () => {
  if (zoomLevel > minZoom) {
    zoomLevel -= zoomStep;
    updateZoom();
  }
});

document.getElementById("zoom-reset").addEventListener("click", () => {
  zoomLevel = 1;
  updateZoom();
});

function updateZoom() {
  workspaceContent.style.transform = `scale(${zoomLevel})`;
}
