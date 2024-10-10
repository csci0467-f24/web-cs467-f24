function createLabeledSlider(min, max, value, step, label) {
  const labeledSlider = createDiv();
  createDiv(label).parent(labeledSlider);

  const slider = createSlider(min, max, value, step);
  slider.parent(labeledSlider);
  slider.input(() => {
    valueDisplay.html(slider.value());
  });
  const valueDisplay = createSpan(value);
  valueDisplay.parent(labeledSlider);

  labeledSlider.changed = (f) => {
    slider.changed(() => {
      f();
    });
  };

  labeledSlider.input = (f) => {
    slider.input(() => {
      valueDisplay.html(slider.value());
      f();
    });
  };

  labeledSlider.value = (arg) => {
    if (arg) {
      slider.value(arg);
    } else {
      return slider.value();
    }
  };
  return labeledSlider;
}

function createLabeledInput(value, label) {
  const labeledInput = createDiv();
  createDiv(label).parent(labeledInput);

  const input = createInput(value);
  input.parent(labeledInput);
  labeledInput.changed = (f) => {
    input.changed(f);
  };

  labeledInput.value = (arg) => {
    if (arg) {
      input.value(arg);
    } else {
      return input.value();
    }
  };
  return labeledInput;
}
