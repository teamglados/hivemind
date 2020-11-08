output "cloudfront_app_id" {
  value = aws_cloudfront_distribution.App.id
}

output "api_instance_public_dns" {
  value = [aws_instance.Api.public_dns]
}
