Heal Bharat
AI Emergency Pressure & Ambulance Load Prediction System
Project Overview

Heal Bharat is an AI-driven Emergency Monitoring Dashboard designed to help hospitals and emergency authorities predict and manage Emergency Department (ED) overload situations.

The system analyzes emergency indicators such as ambulance arrivals, accident-prone zones, emergency pressure levels, and time-based trends to provide early alerts and improve emergency preparedness.

The project is implemented in two stages:

Phase-1 establishes the core MVP foundation and dashboard visualization.
Phase-2 expands the system with modular architecture, backend APIs, and scalable logic integration.

Objective

The main objective of the system is to:

Predict emergency pressure on hospitals

Identify accident-prone hotspot zones

Forecast ambulance arrival trends

Trigger early alerts for overload situations

Improve ambulance and hospital resource allocation

Reduce emergency chaos and response delays

Enable scalable AI-driven emergency monitoring

Phase-1 Scope (Foundation & MVP)

Phase-1 focuses on building the core foundation and visualization layer of the system.

Implemented Features

Real-time Emergency Monitoring Dashboard
Emergency Pressure Index (EPI) Calculation
Ambulance Load Density Indicator
Rule-based Early Alert System (Normal / Warning / Critical)
Accident Hotspot Zone Detection
Ambulance Arrival Forecast Visualization
City, Hospital, and Date Filters (MVP Logic)
Fully Responsive Frontend UI

Phase-2 Scope (Logic Expansion & Enhancements)

Phase-2 refactors the system into a modular and scalable architecture by separating frontend, backend, and AI logic layers.

Implemented Enhancements

Modular architecture separating frontend, backend API, and prediction logic
FastAPI-based backend exposing AI logic as API endpoints
API-consumable prediction and forecasting models
Backend-driven emergency pressure prediction
Backend-driven ambulance arrival forecasting
Real-time threshold-based alert system
Input validation and edge-case handling
Dashboard integrated with backend APIs
Scalable structure suitable for city-level deployment

System Architecture

Frontend Dashboard handles user interaction and visualization.
Backend API layer processes requests and exposes prediction endpoints.
AI Logic layer performs pressure calculation, forecasting, and hotspot scoring.

Data flow:

User Input → Frontend Dashboard → Backend API → Prediction Logic → Dashboard Update

Core Logic Implemented
Emergency Pressure Index (EPI)

EPI = Base Emergency Pressure + (Ambulance Arrivals × Weight)

This represents the expected emergency load on hospitals and helps simulate overload conditions.

Ambulance Load Density

Represents incoming ambulance load relative to hospital capacity and assists in identifying sudden surge conditions.

Hotspot Scoring

Hotspot Score = Accident Count × Risk Weight

Used to identify accident-prone zones requiring higher emergency preparedness.

Ambulance Arrival Forecast

Time-series based estimation of ambulance arrivals over upcoming hours, enabling proactive resource allocation and planning.

Technology Stack

Frontend: HTML, CSS, JavaScript, Chart.js
Backend: FastAPI (Python)
Logic Layer: Python-based prediction modules
Version Control: GitHub

Expected Impact

Heal Bharat enables early identification of emergency overload risks, improves ambulance allocation decisions, and supports faster response planning for hospitals and emergency authorities.
