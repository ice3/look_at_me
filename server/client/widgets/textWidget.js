function TextWidget(id, target){
  Widget.call(this, id);
  this.target = target;
  that = this;

}

TextWidget.prototype = Object.create(Widget.prototype);
TextWidget.prototype.constructor = TextWidget;

TextWidget.prototype.update_ui = function() {
  var last = that.data[that.data.length -1];
  var target = "#" + that.target;
  $(target).text(last);
};

TextWidget.prototype.run = function(){
  console.log("in run for: ", this)
  var that = this;
  console.log(that.refresh_ms)
  this.interval = setInterval(
    that.update_ui,
    that.refresh_ms
  );
}


tw = new TextWidget("cos", "p_cos");
tw.run();
widgets.cos = tw;
