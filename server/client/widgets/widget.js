function Widget(id){
  this.id = id;
  this.data = [];
  this.refresh_ms = 500;
  console.log("nouveau widget avec id : ", this.id);
}

Widget.prototype.update_data = function(all_data) {
  this.data.push(all_data);
};

