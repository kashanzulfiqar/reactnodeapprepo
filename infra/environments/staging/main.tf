terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

module "staging_infra" {
  source        = "../../modules/app_stack"
  
  environment   = "staging"
  instance_type = "t3.micro"       # Small instance for staging
  ami_id        = "ami-0ac1f955d6e62f3f1" # Replace with valid Ubuntu/Amazon Linux AMI in us-east-1
}

output "staging_ec2_ip" {
  value = module.staging_infra.ec2_public_ip
}

output "staging_cloudfront_id" {
  value = module.staging_infra.cloudfront_distribution_id
}
