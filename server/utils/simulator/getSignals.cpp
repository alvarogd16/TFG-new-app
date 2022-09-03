#include "getSignals.h"

std::string getSignals(Simulation *sim) {
    std::string ret = "{\"simTime\":" + sim->getSimTime() + ",";
    ret += "\"clk\":" + std::to_string(sim->dut->clk) + "}";
    return ret;
}