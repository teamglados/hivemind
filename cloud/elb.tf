resource "aws_elb" "ApiLB" {
  name = "api-lb"
  security_groups = [aws_security_group.Public.id]
  subnets = [aws_subnet.PublicCloud.id]
  instances = [aws_instance.Api.id]

  connection_draining = true
  cross_zone_load_balancing = true
  idle_timeout = 3600

  listener {
    instance_port = 8000
    instance_protocol = "tcp"
    lb_port = 443
    lb_protocol = "ssl"
    ssl_certificate_id = lookup(var.ACM-hivemindlivecom-arn, var.AwsRegion)
  }

  health_check {
    healthy_threshold = 2
    unhealthy_threshold = 10
    target = "TCP:22"
    interval = 10
    timeout = 5
  }

  tags = {
    Name = "api-lb"
    Environment = "prod"
  }
}
