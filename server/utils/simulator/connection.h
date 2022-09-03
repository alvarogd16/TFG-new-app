#ifndef CONNECTION_H
#define CONNECTION_H

#include <sio_client.h>
#include <mutex>
#include <condition_variable>
#include "simulation.h"
#include "getSignals.h"

class Connection {
private:
    std::condition_variable *cv;
    sio::client client;
    sio::socket::ptr currentSocket;

    std::mutex mutex;
    std::condition_variable_any cond;
    bool isConnectFinish = false;

    void onConnect();
public:
    Connection(std::condition_variable *cv);

    void establishConnection();
    void bindListeners(Simulation *sim);
    void finishConnection();
};

#endif