data "template_file" "InitKeys" {
  template = "${file("init/keys")}"
}

data "template_file" "InitCloud" {
  template = "${file("init/init.sh")}"
  vars = {
    keys = "${data.template_file.InitKeys.rendered}"
  }
}
