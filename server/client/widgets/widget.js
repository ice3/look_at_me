function Widget(div_id){
  this.init(div_id);
  this.init_slider(div_id);

  console.log("nouveau widget avec id : ", this.id);
}

Widget.prototype.init = function(div_id){
  this.widget_id = div_id+"_widget";

  this.div_id = div_id;
  this.slider_id = div_id+"_slider";
  this.slider_box_id = this.slider_id + "_box";
  this.slider_value_id = this.slider_id + "_value";

  this.data = [];
  this.refresh_ms = 500;
}

Widget.prototype.init_slider = function(div_id){
  var that = this;

  // slider box
  $("#" + div_id).append('<div id="' + this.slider_box_id + '"></div>')
  $("#" + div_id).append('<span id="' + this.slider_value_id + '"></span>')
  refresh_value = "Refresh rate: " + that.refresh_ms + " ms";
  $("#" + that.slider_value_id).text(refresh_value);

  slider = '<input type="range" value="'+ this.refresh_ms + '" max="1000" min="1" step="1">'
  $(slider).attr('id', this.slider_id).appendTo('#'+this.slider_box_id);

  $("#"+this.slider_id).on("change", function(){
    that.refresh_ms = this.value;
    that.stop();
    that.run();

    refresh_value = "Refresh rate: " + that.refresh_ms + " ms";
    $("#" + that.slider_value_id).text(refresh_value);
  });
}

Widget.prototype.update_data = function(all_data) {
  this.data.push(all_data);
};

Widget.prototype.run = function(){
  var that = this;
  this.interval = setInterval(
    function(){that.update_ui()},
    that.refresh_ms
  );
}

Widget.prototype.stop = function(){
  clearInterval(this.interval);
}
