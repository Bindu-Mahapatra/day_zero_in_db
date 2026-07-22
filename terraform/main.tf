terraform {
  required_providers {
    docker = {
      source = "kreuzwerker/docker"
    }
  }
}

provider "docker" {}

resource "docker_image" "backend" {
  name = "dayzero-backend:v1"
}

resource "docker_image" "frontend" {
  name = "dayzero-frontend:v1"
}

resource "docker_container" "backend" {
  image = docker_image.backend.image_id
  name  = "backend"

  ports {
    internal = 8080
    external = 8080
  }
}

resource "docker_container" "frontend" {
  image = docker_image.frontend.image_id
  name  = "frontend"

  ports {
    internal = 80
    external = 4200
  }
}