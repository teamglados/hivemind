resource "aws_instance" "Api" {
  ami = lookup(var.AwsUbuntuAMIs, var.AwsRegion)
  key_name = var.DeployerKeyName

  vpc_security_group_ids = [aws_security_group.Public.id]
  subnet_id = aws_subnet.PublicCloud.id

  availability_zone = data.aws_availability_zones.available.names[0]

  instance_type = "t3.2xlarge"
  iam_instance_profile = aws_iam_instance_profile.Server.name
  associate_public_ip_address = true

  user_data = data.template_file.InitCloud.rendered

  root_block_device {
    volume_size = "32"
  }

  tags = {
    Type = "instance"
    Environment = "prod"
  }
}
