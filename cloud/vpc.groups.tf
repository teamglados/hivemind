resource "aws_security_group" "Public" {
  name_prefix = "public-"
  description = "all outbound, public ssh, http, https inbound"
  vpc_id = aws_vpc.Cloud.id

  # Allow incoming HTTP
  ingress {
    from_port = 80
    to_port = 80
    protocol = "TCP"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Allow incoming HTTPS
  ingress {
    from_port = 443
    to_port = 443
    protocol = "TCP"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Allow incoming proxied HTTPS
  ingress {
    from_port = 443
    to_port = 8000
    protocol = "TCP"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Allow incoming SSH
  ingress {
    from_port = 22
    to_port = 22
    protocol = "TCP"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Allow all outgoing
  egress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  lifecycle {
    create_before_destroy = true
  }

  tags = {
    Name = "public-security-group"
	Environment = "prod"
  }
}
