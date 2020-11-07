# Data source for availability zones
data "aws_availability_zones" "available" {}

# Main Virtual Private Cloud
resource "aws_vpc" "Cloud" {
  cidr_block = var.CloudFullCIDR

  # Enable internal vpc dns resolution
  enable_dns_support = true
  enable_dns_hostnames = true

  tags = {
    Name = "main-vpc"
    Environment = "prod"
  }
}

# Open ACL, rules will be enforced by security groups
resource "aws_network_acl" "Open" {
  vpc_id = aws_vpc.Cloud.id
  subnet_ids = [aws_subnet.PublicCloud.id] 

  ingress {
    protocol = "-1"
    rule_no = 1
    action = "allow"
    cidr_block = "0.0.0.0/0"
    from_port = 0
    to_port = 0
  }

  egress {
    protocol = "-1"
    rule_no = 2
    action = "allow"
    cidr_block = "0.0.0.0/0"
    from_port = 0
    to_port = 0
  }

  tags = {
    Name = "open-acl"
    Environment = "prod"
  }
}

# Public gateway
resource "aws_internet_gateway" "CloudGW" {
  vpc_id = aws_vpc.Cloud.id

  tags = {
    Name = "public-cloud-gateway"
    Environment = "prod"
  }
}

# Public cloud routes
resource "aws_route_table" "Public" {
  vpc_id = aws_vpc.Cloud.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.CloudGW.id
  }

  tags = {
    Name = "public-route-table"
    Environment = "prod"
  }
}

# Public cloud subnet
resource "aws_subnet" "PublicCloud" {
  vpc_id = aws_vpc.Cloud.id
  cidr_block = var.SubnetPublicCIDR
  availability_zone = data.aws_availability_zones.available.names[0]

  tags = {
    Name = "public-cloud"
    Environment = "prod"
  }
}

resource "aws_route_table_association" "PublicCloud" {
  subnet_id = aws_subnet.PublicCloud.id
  route_table_id = aws_route_table.Public.id
}
