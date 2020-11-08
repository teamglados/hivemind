resource "aws_route53_record" "ApiLogin" {
  zone_id = var.ZoneID-hivemindlivecom
  name = "api-login.hivemindlive.com"
  type = "A"
  ttl = 300
  records = [aws_instance.Api.public_ip]
}

resource "aws_route53_record" "ApiLB" {
  zone_id = var.ZoneID-hivemindlivecom
  name = "api.hivemindlive.com"
  type = "A"
  alias {
    name = aws_elb.ApiLB.dns_name
    zone_id = aws_elb.ApiLB.zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "AppCDN" {
  zone_id = var.ZoneID-hivemindlivecom
  name = "www.hivemindlive.com"
  type = "A"
  alias {
    name = aws_cloudfront_distribution.App.domain_name
    zone_id = var.ZoneID-CloudFront
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "AppCDN2" {
  zone_id = var.ZoneID-hivemindlivecom
  name = "hivemindlive.com"
  type = "A"
  alias {
    name = aws_cloudfront_distribution.App.domain_name
    zone_id = var.ZoneID-CloudFront
    evaluate_target_health = false
  }
}
