#include "connection.h"
#include <stdio.h>
#include <unistd.h>
#include <string>
#include <thread>

Connection::Connection(std::condition_variable *cv) {
    this->cv = cv;
}

void Connection::onConnect() {
    mutex.lock();
    cond.notify_all();
    isConnectFinish = true;
    mutex.unlock();
}

void Connection::establishConnection() {
    printf("Trying to connect\n");

    // You need to bind the method with this in order to convert it to a std::function
    // More information here https://stackoverflow.com/questions/7582546/using-generic-stdfunction-objects-with-member-functions-in-one-class
    client.set_open_listener(std::bind(&Connection::onConnect, this));
    client.connect("http://127.0.0.1:3001");

    mutex.lock();
    if(!isConnectFinish)
        cond.wait(mutex);
    mutex.unlock();

    currentSocket = client.socket("/simulator");
}

void Connection::bindListeners(Simulation *sim) {
    // Declaring lambdas
    auto endFunction = [&](std::string const& name, sio::message::ptr const& data, bool isAck, sio::message::list &ackResp) {
        mutex.lock();
        printf("end\n");
        this->cv->notify_one();
        mutex.unlock();
    };

    auto tickFunction = [sim, this](std::string const& name, sio::message::ptr const& data, bool isAck, sio::message::list &ackResp) {
        mutex.lock();
        // printf("tick\n");

        sim->tick();
        std::string msg = getSignals(sim);
        currentSocket->emit("verilator:data", msg);

        mutex.unlock();
    };

    // Bind listeners
    currentSocket->on("verilator:end", sio::socket::event_listener_aux(endFunction));
    currentSocket->on("verilator:tick", sio::socket::event_listener_aux(tickFunction));

    currentSocket->emit("verilator:establishConection");
}

void Connection::finishConnection() {
    sleep(1);
    client.sync_close();
    client.clear_con_listeners();
}