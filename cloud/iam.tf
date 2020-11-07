data "aws_iam_policy_document" "DataECIAMAssumeRole" {
  statement {
    sid = "EC2AssumeRole"
    effect = "Allow"
    actions = ["sts:AssumeRole"]
    principals {
      type = "Service"
      identifiers = ["ec2.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "Server" {
  name = "server"
  assume_role_policy = data.aws_iam_policy_document.DataECIAMAssumeRole.json
}

resource "aws_iam_instance_profile" "Server" {
  name = "server"
  role = aws_iam_role.Server.name
}
