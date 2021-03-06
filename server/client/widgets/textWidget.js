function TextWidget(data_binding, div_id){
  Widget.call(this, div_id);
  $('<p>').attr('id', this.widget_id).appendTo('#'+div_id);
}

TextWidget.prototype = Object.create(Widget.prototype);
TextWidget.prototype.constructor = TextWidget;

TextWidget.prototype.update_ui = function() {
  var last = this.data[this.data.length -1];
  var target = "#" + this.widget_id;
  $(target).text(last);
};


tw = new TextWidget("cos", "widget_cos");
tw.run();
widgets.add("cos", tw);

tw2 = new TextWidget("sin", "widget_sin");
tw2.run();
widgets.add("sin", tw2);
