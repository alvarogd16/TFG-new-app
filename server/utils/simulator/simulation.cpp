#include "simulation.h"
#include <stdio.h>

Simulation::Simulation() {
    simTime = 0;
    dut = new VoutFile;
}

Simulation::~Simulation() {
    delete dut;
}

void Simulation::tick() {
    dut->clk ^= 1;
    dut->eval();
    dut->clk ^= 1;
    dut->eval();
    simTime++;
}

std::string Simulation::getData() {
    std::string ret = "{\"simTime\": " + std::to_string(simTime) + "}";
    return ret;
}

std::string Simulation::getSimTime() {
    return std::to_string(simTime);
}