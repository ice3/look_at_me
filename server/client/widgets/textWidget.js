function TextWidget(data_binding, div_id){
  Widget.call(this, div_id);
  $('<p>').attr('id', this.widget_id).appendTo('#'+div_id);

  that = this;
}

TextWidget.prototype = Object.create(Widget.prototype);
TextWidget.prototype.constructor = TextWidget;

TextWidget.prototype.update_ui = function() {
  var last = that.data[that.data.length -1];
  var target = "#" + that.widget_id;
  $(target).text(last);
};



tw = new TextWidget("cos", "widget_cos");
tw.run();
widgets.cos = tw;
