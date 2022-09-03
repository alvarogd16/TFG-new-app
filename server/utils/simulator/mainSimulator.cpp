#include "./connection.h"
#include "./simulation.h"
#include <iostream>
#include <string>
#include <thread>
#include <mutex>
#include <condition_variable>

int main(int argc, char** argv, char** env) {
    printf("Perico el de los palotes\n");
    std::mutex m;
    std::condition_variable cv;

    bool isMainFinish = false;

    Connection connection(&cv);
    connection.establishConnection();

    Simulation sim;
    connection.bindListeners(&sim);

    std::unique_lock<std::mutex> lk(m);
    cv.wait(lk);
    
    // Only finish event by server change value of isMainFinish to true
    // while(!isMainFinish);

    // Finish all threads connections and clear the listeners
    connection.finishConnection();
    return 0;
}