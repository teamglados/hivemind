#resource "aws_cloudfront_distribution" "App" {
#  depends_on = [aws_s3_bucket.App]
#  aliases = ["www.hivemindlive.com", "hivemindlive.com"]
#
#  price_class = "PriceClass_100"
#
#  enabled = true
#  retain_on_delete = false
#  default_root_object = "index.html"
#
#  custom_error_response {
#    error_code = "404"
#    error_caching_min_ttl = "60"
#    response_code = "200"
#    response_page_path = "/index.html"
#  }
#
#  origin {
#    domain_name = "www.hivemindlive.com.s3.amazonaws.com"
#    origin_id = "website_bucket_origin"
#  }
#
#  default_cache_behavior {
#    allowed_methods = [ "DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT" ]
#    cached_methods = [ "GET", "HEAD" ]
#    target_origin_id = "website_bucket_origin"
#    forwarded_values {
#      query_string = true
#      cookies {
#        forward = "none"
#      }
#    }
#    viewer_protocol_policy = "redirect-to-https"
#    min_ttl = 0
#    default_ttl = 300
#    max_ttl = 600
#  }
#
#  viewer_certificate {
#    acm_certificate_arn = var.ACM-CF-hivemindlive-arn
#    minimum_protocol_version = "TLSv1"
#    ssl_support_method = "sni-only"
#  }
#
#  restrictions {
#    geo_restriction {
#      restriction_type = "blacklist"
#      locations = ["CN", "RU"]
#    }
#  }
#}
