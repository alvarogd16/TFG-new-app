#ifndef SIMULATION_H
#define SIMULATION_H

#include <string>
#include <verilated.h>
#include <verilated_vcd_c.h>
#include "VoutFile.h"

class Simulation {
private:
    int maxSimTime;
    vluint64_t simTime;

public:
    VoutFile *dut;

    Simulation(int _maxSimTime);
    Simulation();

    ~Simulation();

    void tick();
    std::string getData();
    std::string getSimTime();
};

#endif