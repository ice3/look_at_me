function WidgetList(){
  this.container = {}
}

WidgetList.prototype.add = function(name, widget){
  widgets_for_name = this.container[name];
  if(widgets_for_name === undefined){
    this.container[name] = [];
  }

  this.container[name].push(widget);
}

WidgetList.prototype.get = function(name){
  return Array.from(this.container[name]); // return Array to get forEach
}

var widgets = new WidgetList();