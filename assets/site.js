const tabButtons = document.querySelectorAll(".tab-button");
const panels = document.querySelectorAll(".lab-panel");

function activatePanel(panelId) {
  tabButtons.forEach((button) => {
    const isActive = button.dataset.panel === panelId;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });

  panels.forEach((panel) => {
    const isActive = panel.id === panelId;
    panel.classList.toggle("active", isActive);
    panel.hidden = !isActive;
  });
}

tabButtons.forEach((button) => {
  button.addEventListener("click", () => activatePanel(button.dataset.panel));
});

const scriptPreview = document.querySelector("[data-script-preview]");

function renderCodePreview(codeElement, sourceText) {
  const lines = sourceText.replace(/\s+$/, "").split("\n");
  const rows = lines.map((line, index) => {
    const row = document.createElement("span");
    row.className = "code-line";
    row.dataset.line = String(index + 1);
    row.textContent = line || " ";
    return row;
  });

  codeElement.replaceChildren(...rows);
}

if (scriptPreview) {
  fetch(scriptPreview.dataset.scriptSrc)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Script preview failed to load.");
      }
      return response.text();
    })
    .then((sourceText) => renderCodePreview(scriptPreview, sourceText))
    .catch(() => {
      scriptPreview.textContent = "Unable to load the script preview. Use the download link above to open the file.";
    });
}

const homeDeckSlides = [
  {
    title: "Introduction to Artificial Neural Networks",
    summary: "Opens the workshop and frames the session as a practical introduction to neural networks for deep-learning applications.",
    points: [
    "Presenter: Hao Ji, Data Scientist at USC CARC.",
    "Set expectations: concepts first, then PyTorch practice.",
    "Good moment to ask learners about prior Python, GPU, or machine-learning experience.",
    ],
  },
  {
    title: "Workshop Content",
    summary: "Establishes the learning path: introduction, neural networks, applications, and hands-on PyTorch.",
    points: [
    "Use this slide as the roadmap for the whole session.",
    "The final section is the longest because it moves from lecture into code.",
    "Signal that the earlier concepts will reappear in the notebook.",
    ],
  },
  {
    title: "Deep Learning In Context",
    summary: "Defines deep learning as a subfield of machine learning and connects it to artificial neural networks.",
    points: [
    "Examples include computer vision, text generation, speech recognition, and game AI.",
    "The examples help learners connect abstract networks to familiar products.",
    "Emphasize that deep learning models learn representations from data instead of hand-coded rules.",
    ],
  },
  {
    title: "Why Deep Learning Grew Quickly",
    summary: "Explains why deep learning has advanced rapidly: more data, better storage, and stronger compute.",
    points: [
    "Connect GPU acceleration to the workshop's CARC environment setup.",
    "Make the point that data and compute shape what models are practical.",
    "This prepares learners for why the lab requests GPU resources.",
    ],
  },
  {
    title: "Transition To Neural Networks",
    summary: "A visual transition slide that gives learners a pause before moving from broad deep-learning motivation into network structure.",
    points: [
    "Use this moment to recap the previous examples.",
    "Bridge from applications to the components that make predictions possible.",
    "Preview the input-hidden-output layer vocabulary used next.",
    ],
  },
  {
    title: "Biological And Artificial Neurons",
    summary: "Introduces the common analogy between biological neurons and artificial neural-network units.",
    points: [
    "Inputs are combined, transformed, and passed forward.",
    "Weights control how strongly each input influences a neuron.",
    "Keep the analogy lightweight: the artificial model is mathematical, not a full brain simulation.",
    ],
  },
  {
    title: "Input, Hidden, And Output Layers",
    summary: "Names the three layer types used in a neural network and explains that deep networks have more hidden layers.",
    points: [
    "The input layer receives features, such as image pixels.",
    "Hidden layers learn intermediate representations.",
    "The output layer produces task-specific scores or predictions.",
    ],
  },
  {
    title: "Fashion-MNIST Classification Task",
    summary: "Introduces the lab problem: classify 28 x 28 grayscale clothing images into ten categories.",
    points: [
    "The dataset has 60,000 training images and 10,000 test images.",
    "The class labels include shirts, shoes, bags, trousers, and related items.",
    "This is a clear first neural-network task because inputs and labels are easy to inspect.",
    ],
  },
  {
    title: "Inputs And Logits",
    summary: "Shows how an image becomes model input and how the network makes predictions from logits.",
    points: [
    "A 28 x 28 image becomes 784 numeric input features after flattening.",
    "Logits are raw class scores before selecting the highest-scoring label.",
    "This connects directly to the notebook's final prediction step.",
    ],
  },
  {
    title: "Weights, Bias, And ReLU",
    summary: "Walks through the first hidden-layer computation: multiply inputs by weights, add a bias, then apply an activation function.",
    points: [
    "Weights usually start with random initialization.",
    "The bias shifts the weighted sum before activation.",
    "ReLU keeps positive values and clips negative values to zero.",
    ],
  },
  {
    title: "Activation Calculation Review",
    summary: "Reinforces the single-neuron calculation so learners can see how a numeric input becomes an activation.",
    points: [
    "Separate the linear step from the activation step.",
    "Use the notation to explain which layer the value belongs to.",
    "This prepares learners for thinking about many neurons at once.",
    ],
  },
  {
    title: "Moving Activations Forward",
    summary: "Extends the calculation into another layer, where earlier activations become the inputs to the next set of weights.",
    points: [
    "Each layer transforms the representation created by the previous layer.",
    "Deep networks repeat this pattern many times.",
    "The same idea appears in PyTorch as stacked linear and activation layers.",
    ],
  },
  {
    title: "Three Training Steps",
    summary: "Summarizes training as a loop of prediction, error measurement, and weight updates.",
    points: [
    "Forward propagation produces predictions.",
    "The loss function compares predictions with labels.",
    "Backward propagation computes updates that reduce future error.",
    ],
  },
  {
    title: "Training Pipeline",
    summary: "Names the main choices in a training workflow: model, loss function, and optimizer.",
    points: [
    "The model defines how inputs become predictions.",
    "The loss function defines what error means for the task.",
    "The optimizer defines how parameters are updated during training.",
    ],
  },
  {
    title: "Deep Learning Applications",
    summary: "Marks the shift from neural-network mechanics to examples of where deep learning is used.",
    points: [
    "Use this as a discussion point for domain-specific research use cases.",
    "Connect application examples to data modalities such as images, text, and audio.",
    "Prepare learners for why frameworks provide domain libraries.",
    ],
  },
  {
    title: "Neural-Network Packages",
    summary: "Introduces the major framework ecosystem, including PyTorch and TensorFlow.",
    points: [
    "PyTorch is the framework used in this workshop notebook.",
    "Frameworks handle tensors, automatic differentiation, model layers, and optimization tools.",
    "This slide is a useful bridge from concept diagrams to runnable code.",
    ],
  },
  {
    title: "PyTorch Tensors",
    summary: "Defines tensors as the core data structure for model inputs, outputs, and parameters.",
    points: [
    "Tensors are similar to arrays and matrices.",
    "They can run on CPUs, GPUs, and other accelerators.",
    "PyTorch tensors support automatic differentiation for training.",
    ],
  },
  {
    title: "PyTorch Workflow",
    summary: "Gives the notebook roadmap: work with data, create the model, optimize parameters, and save the trained model.",
    points: [
    "This is the table of contents for the hands-on lab.",
    "The homepage lab tabs follow this same sequence.",
    "Make clear that each workflow step maps to a concrete notebook cell.",
    ],
  },
  {
    title: "Lab Task Restated",
    summary: "Reintroduces Fashion-MNIST at the start of the PyTorch tutorial so learners know exactly what the code will solve.",
    points: [
    "The model learns to choose one of ten clothing categories.",
    "The input images are small enough for a beginner-friendly lab.",
    "Use this slide before switching attention to the notebook.",
    ],
  },
  {
    title: "Anaconda And Jupyter Setup",
    summary: "Explains the workshop environment path: create a conda environment, register a Jupyter kernel, then run the notebook through Open OnDemand.",
    points: [
    "Point learners to the GitHub source repository before setup.",
    "Use the provided setup script to install the common packages.",
    "Older GPU nodes may need the PyTorch reinstall command from the setup section.",
    ],
  },
  {
    title: "CARC OnDemand",
    summary: "Points learners to the CARC OnDemand entry point for cluster access and notebook sessions.",
    points: [
    "Have participants confirm VPN or USC secure network access before continuing.",
    "Use this as the handoff from slides to the computing environment.",
    "Keep the CARC site visible if learners need account or system documentation.",
    ],
  },
  {
    title: "Working With Data",
    summary: "Introduces the PyTorch data primitives used in the notebook: Dataset and DataLoader.",
    points: [
    "Dataset stores samples and labels.",
    "DataLoader wraps a Dataset for batching and iteration.",
    "TorchVision provides ready-to-use datasets such as Fashion-MNIST, CIFAR, and COCO.",
    ],
  },
  {
    title: "Import Required Modules",
    summary: "Starts the notebook implementation by importing PyTorch, neural network layers, data loading utilities, and TorchVision datasets.",
    points: [
    "Imports define the major pieces used across the notebook.",
    "Point out that `nn` contains the model-building blocks.",
    "`ToTensor` converts image data into tensor form for the model.",
    ],
  },
  {
    title: "Define Training And Test Datasets",
    summary: "Shows the dataset creation step for downloading train and test splits of Fashion-MNIST.",
    points: [
    "`train=True` selects the 60,000-image training split.",
    "`train=False` selects the 10,000-image test split.",
    "The `transform=ToTensor()` argument prepares samples for PyTorch operations.",
    ],
  },
  {
    title: "Define DataLoaders",
    summary: "Wraps the train and test datasets in DataLoader objects so the training code can work batch by batch.",
    points: [
    "The notebook uses a batch size of 64.",
    "Batching makes training more efficient and stable than one image at a time.",
    "The first printed shape check confirms the model will receive `[N, C, H, W]` tensors.",
    ],
  },
  {
    title: "Create The Model",
    summary: "Moves from data preparation to model definition, including a GPU availability check.",
    points: [
    "The notebook chooses `cuda` when a GPU is available, otherwise `cpu`.",
    "The model inherits from `nn.Module`.",
    "The architecture uses flattening, linear layers, and ReLU activations.",
    ],
  },
  {
    title: "Choose Loss And Optimizer",
    summary: "Connects the training pipeline to code by defining cross-entropy loss and stochastic gradient descent.",
    points: [
    "Cross-entropy fits multi-class classification problems.",
    "SGD updates model parameters after gradients are computed.",
    "The learning rate controls the size of each optimizer step.",
    ],
  },
  {
    title: "Define The Training Function",
    summary: "Documents the core training loop: move data to the device, compute predictions and loss, then backpropagate updates.",
    points: [
    "`model.train()` puts the model in training mode.",
    "`optimizer.zero_grad()` clears old gradients before each update.",
    "`loss.backward()` and `optimizer.step()` are the key backpropagation actions.",
    ],
  },
  {
    title: "Evaluate On Test Data",
    summary: "Shows the evaluation side of the workflow, where the trained model is checked on held-out test examples.",
    points: [
    "`model.eval()` switches to evaluation behavior.",
    "`torch.no_grad()` avoids unnecessary gradient tracking.",
    "Accuracy and average loss give quick feedback about model performance.",
    ],
  },
  {
    title: "Run The Epoch Loop",
    summary: "Combines training and evaluation into multiple epochs so learners can watch loss decrease and accuracy improve.",
    points: [
    "The notebook runs five epochs.",
    "Each epoch calls the training function and then the test function.",
    "This is the clearest place to discuss underfitting, overfitting, and runtime tradeoffs.",
    ],
  },
  {
    title: "Save Model Weights",
    summary: "Introduces model persistence by saving the model's internal state dictionary.",
    points: [
    "`state_dict()` contains the learned parameters.",
    "The notebook writes those parameters to `model.pth`.",
    "Saving weights lets learners reuse a trained model without retraining immediately.",
    ],
  },
  {
    title: "Load Model Weights",
    summary: "Shows that loading requires recreating the same model structure before applying the saved state dictionary.",
    points: [
    "The architecture must match the saved parameters.",
    "`load_state_dict()` restores the learned weights.",
    "After loading, the model is ready for evaluation or inference.",
    ],
  },
  {
    title: "Make A Prediction",
    summary: "Finishes the workflow by selecting a test image, running the model, and translating the highest logit into a class name.",
    points: [
    "Use `model.eval()` and `torch.no_grad()` for inference.",
    "`argmax` selects the most likely class index.",
    "The final printout compares the predicted label with the actual label.",
    ],
  },
];
const homeDeckImage = document.querySelector("[data-home-deck-image]");
const homeDeckStatus = document.querySelector("[data-home-deck-status]");
const homeDeckTitle = document.querySelector("[data-home-deck-title]");
const homeDeckKicker = document.querySelector("[data-home-deck-kicker]");
const homeDeckNoteTitle = document.querySelector("[data-home-deck-note-title]");
const homeDeckSummary = document.querySelector("[data-home-deck-summary]");
const homeDeckPoints = document.querySelector("[data-home-deck-points]");
const homeDeckPreviousButton = document.querySelector("[data-home-deck-prev]");
const homeDeckNextButton = document.querySelector("[data-home-deck-next]");

function updateHomeDeck(index) {
  if (!homeDeckImage) return;

  const slideIndex = (index + homeDeckSlides.length) % homeDeckSlides.length;
  const slideNumber = String(slideIndex + 1).padStart(2, "0");
  const slide = homeDeckSlides[slideIndex];
  const slideBase = homeDeckImage.dataset.slideBase || "assets/slides/building-neural-networks";

  homeDeckImage.src = `${slideBase}/slide-${slideNumber}.png`;
  homeDeckImage.alt = `Slide ${slideIndex + 1}: ${slide.title}.`;

  if (homeDeckStatus) {
    homeDeckStatus.textContent = `Slide ${slideNumber} of ${homeDeckSlides.length}`;
  }

  if (homeDeckTitle) {
    homeDeckTitle.textContent = slide.title;
  }

  if (homeDeckKicker) {
    homeDeckKicker.textContent = `Slide ${slideNumber}`;
  }

  if (homeDeckNoteTitle) {
    homeDeckNoteTitle.textContent = slide.title;
  }

  if (homeDeckSummary) {
    homeDeckSummary.textContent = slide.summary;
  }

  if (homeDeckPoints) {
    homeDeckPoints.replaceChildren(
      ...slide.points.map((point) => {
        const item = document.createElement("li");
        item.textContent = point;
        return item;
      })
    );
  }
}

if (homeDeckImage) {
  document.body.classList.add("home-deck-enhanced");

  let homeDeckIndex = 0;
  updateHomeDeck(homeDeckIndex);

  homeDeckPreviousButton?.addEventListener("click", () => {
    homeDeckIndex = (homeDeckIndex - 1 + homeDeckSlides.length) % homeDeckSlides.length;
    updateHomeDeck(homeDeckIndex);
  });

  homeDeckNextButton?.addEventListener("click", () => {
    homeDeckIndex = (homeDeckIndex + 1) % homeDeckSlides.length;
    updateHomeDeck(homeDeckIndex);
  });
}

const slideDocs = Array.from(document.querySelectorAll(".slide-doc"));
const slideLinks = Array.from(document.querySelectorAll('.toc-list a[href^="#slide-"]'));
const slideStatus = document.querySelector("[data-slide-status]");
const slideTitle = document.querySelector("[data-slide-title]");
const previousSlideButton = document.querySelector("[data-slide-prev]");
const nextSlideButton = document.querySelector("[data-slide-next]");

function getSlideTitle(slide) {
  return slide?.dataset.slideTitle || slide?.querySelector(".slide-body h2")?.textContent.trim() || "";
}

function getSlideIndexFromHash() {
  if (!window.location.hash) return 0;
  const slideIndex = slideDocs.findIndex((slide) => `#${slide.id}` === window.location.hash);
  return slideIndex === -1 ? 0 : slideIndex;
}

function updateSlide(index, options = {}) {
  if (!slideDocs.length) return;

  const activeIndex = (index + slideDocs.length) % slideDocs.length;
  const activeSlide = slideDocs[activeIndex];

  slideDocs.forEach((slide, slideIndex) => {
    const isActive = slideIndex === activeIndex;
    slide.classList.toggle("active", isActive);
    slide.hidden = !isActive;
  });

  slideLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${activeSlide.id}`;
    link.classList.toggle("is-active", isActive);
    if (isActive) {
      link.setAttribute("aria-current", "true");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  if (slideStatus) {
    slideStatus.textContent = `Slide ${String(activeIndex + 1).padStart(2, "0")} of ${slideDocs.length}`;
  }

  if (slideTitle) {
    slideTitle.textContent = getSlideTitle(activeSlide);
  }

  if (options.updateHash !== false) {
    window.history.replaceState(null, "", `#${activeSlide.id}`);
  }
}

if (slideDocs.length) {
  document.body.classList.add("deck-enhanced");

  let currentSlideIndex = getSlideIndexFromHash();
  updateSlide(currentSlideIndex, { updateHash: false });

  previousSlideButton?.addEventListener("click", () => {
    currentSlideIndex = (currentSlideIndex - 1 + slideDocs.length) % slideDocs.length;
    updateSlide(currentSlideIndex);
  });

  nextSlideButton?.addEventListener("click", () => {
    currentSlideIndex = (currentSlideIndex + 1) % slideDocs.length;
    updateSlide(currentSlideIndex);
  });

  slideLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetIndex = slideDocs.findIndex((slide) => `#${slide.id}` === link.getAttribute("href"));
      if (targetIndex === -1) return;

      event.preventDefault();
      currentSlideIndex = targetIndex;
      updateSlide(currentSlideIndex);
    });
  });

  window.addEventListener("hashchange", () => {
    currentSlideIndex = getSlideIndexFromHash();
    updateSlide(currentSlideIndex, { updateHash: false });
  });

  document.addEventListener("keydown", (event) => {
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) {
      return;
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      currentSlideIndex = (currentSlideIndex + 1) % slideDocs.length;
      updateSlide(currentSlideIndex);
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      currentSlideIndex = (currentSlideIndex - 1 + slideDocs.length) % slideDocs.length;
      updateSlide(currentSlideIndex);
    }
  });
}
