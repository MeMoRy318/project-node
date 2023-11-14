class InterMediaSetter {
  public setInterMedia() {
    return new Promise((resolve) => {
      setImmediate(resolve);
    });
  }
}

const interMediaSetter = new InterMediaSetter();

export { interMediaSetter };
