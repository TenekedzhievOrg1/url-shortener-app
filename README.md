# URL Shortener (WIP)

This project demonstrates Dockerizing microservices and self managing their deployment on **AWS ECS (EC2 launch type)** — including networking, scaling, and security at the infrastructure level. The systm is composed of **three containerized microservices** (Frontend, Shortener API, Redirect API) and a **PostgreSQL database (RDS)**. Each component runs inside **Amazon ECS tasks** that communicate securely over private subnets, orchestrated through **Service Discovery (AWS Cloud Map)** and exposed publicly through an **Application Load Balancer (ALB)**.

---

## Architecture Overview

- **Frontend:** React app served via Nginx
- **APIs:** Node.js microservices for shortening and redirecting URLs, served via reverse proxy
- **Database:** PostgreSQL for local dev, RDS in prod

---

## CI/CD

**GitHub Actions workflow:**

1. **CI Stage**
   - Build Docker images for the services
   - Scan images for vulnerabilities using Trivy
   - Push images to Amazon ECR Public

2. **CD Stage**
   - Authenticate to AWS with OIDC
   - Register new ECS task revisions with updated image tags
   - Update ECS services to deploy latest images

---

## AWS Deployment

- **Cluster:** ECS (EC2 launch type)
- **Task Definitions:** One per service
- **Service Discovery:** Cloud Map internal DNS for API-to-API communication
- **Load Balancer:** ALB for frontend
- **Database:** RDS PostgreSQL
- **Secrets Management:** AWS Secrets Manager
- **Security & Networking:** 
    - Public subnets for ALB, private for ECS & RDS
    - Reverse proxy abstracts API ports
    - Security groups configured for least privilege
    - ECS tasks pull Docker images securely via VPC endpoints

---

## Local Development

```bash
# 1. Start the containers
docker compose up --build

# 2. Set local environment variables

# 3. Access the app
FE → http://localhost:8080  
API → http://localhost:5000 / http://localhost:5001