# Hub Management System - Phase 1

The **Hub Management System** aims to track and manage vehicles that enter a hub for service, deployment, or other operations. This project contains the **Phase 1 implementation** of the system, focusing on essential features such as vehicle state management, service report generation, task allocation, and basic reporting.

This repository covers the backend API to manage vehicle states, service reporting, task assignments, and related functionality using **Node.js** and **PostgreSQL**.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Database Setup](#database-setup)
  - [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
  - [Vehicle Management Endpoints](#vehicle-management-endpoints)
  - [Service Report Management Endpoints](#service-report-management-endpoints)
  - [Task Management Endpoints](#task-management-endpoints)
  - [User Management Endpoints](#user-management-endpoints)

---

## Project Overview

The **Hub Management System** allows you to:

1. **Manage Vehicle States**: Track the current state of vehicles, such as "Service", "RTD", "Deployed", and "Missing".
2. **Log Vehicle Entries**: Record when vehicles enter the system, including their state (RTD or Service).
3. **Manage Service Reports**: Generate and track service reports, including service entry time, exit time, and turnaround time (TAT).
4. **Task Allocation**: Assign tasks to technicians based on vehicle states and service requirements.
5. **Basic Reporting**: Track key metrics like **Service TAT** and **Hub TAT**.

### Phase 1 Features:
- **Vehicle State Management** (Service, RTD, Missing, Deployed)
- **Service Report Generation** and automatic TAT calculation.
- **Task Assignment** to hub team members.
- **Basic Reporting** on Service TAT and Hub TAT.

### Phase 2 (Future):
- Enhanced features like Job Cards, Service Sub-Stages, and deeper reporting/metrics.

---

## Technologies Used

- **Backend**: Node.js with Express.js
- **Database**: PostgreSQL (via Sequelize ORM)
- **Environment Configuration**: dotenv
- **Request Body Parsing**: Body-Parser
- **Version Control**: Git for source control
- **Containerization** (Optional): Docker

---

## Setup Instructions

Follow these steps to set up and run the project locally.

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (LTS version recommended)
- **npm** (Node package manager)
- **PostgreSQL** or any compatible PostgreSQL service
- **Git** (for version control)
- **Postman** (for API testing, optional)

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/neeldholiya04/hub-management-system.git
   cd hub-management-system
   ```

   1. **Install Dependencies:**
    
    Install the required Node.js packages using npm:
    
    ```bash
    npm install
    ```
    
2. **Setup Environment Variables:**
    
    Create a `.env` file in the root directory and add the following environment variables:
    
    ```
    DB_HOST=localhost
    DB_USER=yourusername
    DB_PASSWORD=yourpassword
    DB_NAME=hub_management_db
    DB_PORT=5432
    ```
    
    Replace `yourusername`, `yourpassword`, and `hub_management_db` with your PostgreSQL credentials.
    
3. **Database Setup:**
    
    Ensure that PostgreSQL is running locally, then run the following commands to create the database and apply migrations:
    
    ```bash
    npx sequelize-cli db:create
    npx sequelize-cli db:migrate
    ```
    
    This will set up the required tables and schema based on the models in the `models` directory.
    

---

## API Endpoints

### 1. **Vehicle Management Endpoints**

### Add Vehicle

- **Endpoint**: `POST /api/vehicles`
- **Description**: Add a new vehicle to the system.
- **Request Body**:
    
    ```json
    {
      "unique_identifier": "V12345",
      "current_state": "Service",
      "entry_time": "2024-12-01T10:00:00Z",
      "exit_time" : "2024-12-01T10:00:00Z",
      "notes": "Scheduled for service"
    }
    ```
    
- **Response**:
    
    ```json
    {
      "vehicle_id": 101,
      "unique_identifier": "V12345",
      "current_state": "Service",
      "entry_time": "2024-12-01T10:00:00Z",
      "notes": "Scheduled for service"
    }
    ```
    

### Update Vehicle State

- **Endpoint**: `PUT /api/vehicles/:vehicleId`
- **Description**: Update the current state of a vehicle.
- **Request Body**:
    
    ```json
    {
      "current_state": "RTD"
    }
    ```
    
- **Response**:
    
    ```json
    {
      "vehicle_id": 101,
      "unique_identifier": "V12345",
      "current_state": "RTD",
      "entry_time": "2024-12-01T10:00:00Z",
      "notes": "Scheduled for service"
    }
    ```
    

### 2. **Service Report Management Endpoints**

### Create Service Report

- **Endpoint**: `POST /api/service-reports`
- **Description**: Create a new service report.
- **Request Body**:
    
    ```json
    {
      "vehicle_id": 101,
      "service_entry_time": "2024-12-01T10:00:00Z",
      "service_exit_time": null,
      "service_details": "Routine service",
      "technician_id": 2001,
      "status": "In Progress"
    }
    ```
    
- **Response**:
    
    ```json
    {
      "report_id": 1,
      "vehicle_id": 101,
      "service_entry_time": "2024-12-01T10:00:00Z",
      "service_exit_time": null,
      "service_tat": null,
      "technician_id": 2001,
      "service_details": "Routine service",
      "status": "In Progress"
    }
    ```
    

### Update Service Report

- **Endpoint**: `PUT /api/service-reports/:reportId`
- **Description**: Update an existing service report with exit time and status.
- **Request Body**:
    
    ```json
    {
      "service_exit_time": "2024-12-01T12:00:00Z",
      "status": "Completed"
    }
    ```
    
- **Response**:
    
    ```json
    {
      "report_id": 1,
      "vehicle_id": 101,
      "service_entry_time": "2024-12-01T10:00:00Z",
      "service_exit_time": "2024-12-01T12:00:00Z",
      "service_tat": 120,
      "technician_id": 2001,
      "service_details": "Routine service completed",
      "status": "Completed"
    }
    ```
    

### Get Service Report by ID

- **Endpoint**: `GET /api/service-reports/:reportId`
- **Description**: Fetch a service report by ID.
- **Response**:
    
    ```json
    {
      "report_id": 1,
      "vehicle_id": 101,
      "service_entry_time": "2024-12-01T10:00:00Z",
      "service_exit_time": "2024-12-01T12:00:00Z",
      "service_tat": 120,
      "technician_id": 2001,
      "service_details": "Routine service completed",
      "status": "Completed"
    }
    ```
    

### Get All Service Reports

- **Endpoint**: `GET /api/service-reports`
- **Description**: Retrieve all service reports.
- **Response**:
    
    ```json
    [
      {
        "report_id": 1,
        "vehicle_id": 101,
        "service_entry_time": "2024-12-01T10:00:00Z",
        "service_exit_time": "2024-12-01T12:00:00Z",
        "service_tat": 120,
        "technician_id": 2001,
        "service_details": "Routine service completed",
        "status": "Completed"
      }
    ]
    ```
    

### 3. **Task Management Endpoints**

### Assign Task

- **Endpoint**: `POST /api/tasks`
- **Description**: Assign a task to a technician.
- **Request Body**:
    
    ```json
    {
      "title": "Service Vehicle",
      "description": "Perform routine service on vehicle V12345",
      "assigned_to": 2001,
      "vehicle_id": 101,
      "status": "Assigned",
      "due_date": "2024-12-05T10:00:00Z"
    }
    ```
    
- **Response**:
    
    ```json
    {
      "task_id": 1,
      "title": "Service Vehicle",
      "description": "Perform routine service on vehicle V12345",
      "assigned_to": 2001,
      "vehicle_id": 101,
      "status": "Assigned",
      "due_date": "2024-12-05T10:00:00Z",
      "completed_at": null
     }
    ```
    

### Get All Task Reports

- **Endpoint**: `GET /api/tasks`
- **Description**: Retrieve all service reports.

