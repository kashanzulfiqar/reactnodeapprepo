variable "environment" {
  type        = string
  description = "Deployment environment (staging or prod)"
}

variable "aws_region" {
  type        = string
  default     = "us-east-1"
}

variable "instance_type" {
  type        = string
  description = "EC2 instance size"
}

variable "ami_id" {
  type        = string
  description = "AMI ID for EC2 instance"
}
