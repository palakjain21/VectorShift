export const resizeTextarea = (element, cursorPos) => {
  element.style.height = 'auto';
  
  const lineHeight = parseFloat(window.getComputedStyle(element).lineHeight) || 20;
  const maxHeight = lineHeight * 5; // 5 lines max
  
  if (element.scrollHeight <= maxHeight) {
    element.style.height = element.scrollHeight + 'px';
    element.style.overflowY = 'hidden';
  } else {
    element.style.height = maxHeight + 'px';
    element.style.overflowY = 'auto';
    scrollToCursor(element, cursorPos);
  }
};

export const scrollToCursor = (element, cursorPos) => {
  const textBeforeCursor = element.value.slice(0, cursorPos);
  const currentLine = textBeforeCursor.split('\n').length - 1;
  const lineHeight = parseFloat(window.getComputedStyle(element).lineHeight) || 20;
  
  const cursorTop = currentLine * lineHeight;
  const visibleHeight = element.clientHeight;
  const scrollTop = element.scrollTop;
  
  if (cursorTop > scrollTop + visibleHeight - lineHeight) {
    element.scrollTop = cursorTop - visibleHeight + lineHeight * 2;
  } else if (cursorTop < scrollTop) {
    element.scrollTop = Math.max(0, cursorTop - lineHeight);
  }
};
