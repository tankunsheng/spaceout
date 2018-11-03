function MyCtor(element, data) {
    this.data = data;
    this.element = element;
    element.innerHTML = data;
    element.addEventListener("change", this, false);
}
MyCtor.prototype.handleEvent = function(event) {
    switch (event.type) {
        case "change": this.change(this.element.value);
    }
};

MyCtor.prototype.change = function(value) {
    this.data = value;
    this.element.innerHTML  = value;
};
export default MyCtor