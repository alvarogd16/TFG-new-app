// Verilated -*- C++ -*-
// DESCRIPTION: Verilator output: Primary design header
//
// This header should be included by all source files instantiating the design.
// The class here is then constructed to instantiate the design.
// See the Verilator manual for examples.

#ifndef _VOUTFILE_H_
#define _VOUTFILE_H_  // guard

#include "verilated.h"

//==========

class VoutFile__Syms;
class VoutFile_VerilatedVcd;


//----------

VL_MODULE(VoutFile) {
  public:
    
    // PORTS
    // The application code writes and reads these signals to
    // propagate new values into/out from the Verilated model.
    VL_IN8(clk,0,0);
    VL_OUT8(MUX2_out,0,0);
    VL_OUT8(R1_out,0,0);
    VL_OUT8(PC_out,0,0);
    VL_OUT8(ROUT_out,0,0);
    VL_OUT8(RCOND_out,0,0);
    VL_OUT8(ROUT_ld,0,0);
    VL_OUT8(MUX2_sel,0,0);
    
    // LOCAL SIGNALS
    // Internals; generally not touched by application code
    CData/*1:0*/ main_1661181246997__DOT__nextState;
    CData/*1:0*/ main_1661181246997__DOT__state;
    CData/*1:0*/ main_1661181246997__DOT__outSignals;
    CData/*0:0*/ main_1661181246997__DOT__R2_out;
    CData/*0:0*/ main_1661181246997__DOT__R1__DOT__in;
    CData/*0:0*/ main_1661181246997__DOT__R1__DOT__ld;
    CData/*0:0*/ main_1661181246997__DOT__PC__DOT__in;
    CData/*0:0*/ main_1661181246997__DOT__PC__DOT__ld;
    CData/*0:0*/ main_1661181246997__DOT__MUX2a__DOT__in_a;
    CData/*0:0*/ main_1661181246997__DOT__MUX2a__DOT__sel;
    CData/*0:0*/ main_1661181246997__DOT__R2__DOT__in;
    CData/*0:0*/ main_1661181246997__DOT__R2__DOT__ld;
    
    // LOCAL VARIABLES
    // Internals; generally not touched by application code
    CData/*2:0*/ __Vtableidx1;
    CData/*0:0*/ __Vclklast__TOP__clk;
    IData/*31:0*/ __Vm_traceActivity;
    static CData/*1:0*/ __Vtable1_main_1661181246997__DOT__nextState[8];
    
    // INTERNAL VARIABLES
    // Internals; generally not touched by application code
    VoutFile__Syms* __VlSymsp;  // Symbol table
    
    // CONSTRUCTORS
  private:
    VL_UNCOPYABLE(VoutFile);  ///< Copying not allowed
  public:
    /// Construct the model; called by application code
    /// The special name  may be used to make a wrapper with a
    /// single model invisible with respect to DPI scope names.
    VoutFile(const char* name = "TOP");
    /// Destroy the model; called (often implicitly) by application code
    ~VoutFile();
    /// Trace signals in the model; called by application code
    void trace(VerilatedVcdC* tfp, int levels, int options = 0);
    
    // API METHODS
    /// Evaluate the model.  Application must call when inputs change.
    void eval();
    /// Simulation complete, run final blocks.  Application must call on completion.
    void final();
    
    // INTERNAL METHODS
  private:
    static void _eval_initial_loop(VoutFile__Syms* __restrict vlSymsp);
  public:
    void __Vconfigure(VoutFile__Syms* symsp, bool first);
  private:
    static QData _change_request(VoutFile__Syms* __restrict vlSymsp);
    void _ctor_var_reset() VL_ATTR_COLD;
  public:
    static void _eval(VoutFile__Syms* __restrict vlSymsp);
  private:
#ifdef VL_DEBUG
    void _eval_debug_assertions();
#endif  // VL_DEBUG
  public:
    static void _eval_initial(VoutFile__Syms* __restrict vlSymsp) VL_ATTR_COLD;
    static void _eval_settle(VoutFile__Syms* __restrict vlSymsp) VL_ATTR_COLD;
    static void _initial__TOP__1(VoutFile__Syms* __restrict vlSymsp) VL_ATTR_COLD;
    static void _sequent__TOP__2(VoutFile__Syms* __restrict vlSymsp);
    static void _settle__TOP__3(VoutFile__Syms* __restrict vlSymsp) VL_ATTR_COLD;
    static void traceChgThis(VoutFile__Syms* __restrict vlSymsp, VerilatedVcd* vcdp, uint32_t code);
    static void traceChgThis__2(VoutFile__Syms* __restrict vlSymsp, VerilatedVcd* vcdp, uint32_t code);
    static void traceChgThis__3(VoutFile__Syms* __restrict vlSymsp, VerilatedVcd* vcdp, uint32_t code);
    static void traceChgThis__4(VoutFile__Syms* __restrict vlSymsp, VerilatedVcd* vcdp, uint32_t code);
    static void traceFullThis(VoutFile__Syms* __restrict vlSymsp, VerilatedVcd* vcdp, uint32_t code) VL_ATTR_COLD;
    static void traceFullThis__1(VoutFile__Syms* __restrict vlSymsp, VerilatedVcd* vcdp, uint32_t code) VL_ATTR_COLD;
    static void traceInitThis(VoutFile__Syms* __restrict vlSymsp, VerilatedVcd* vcdp, uint32_t code) VL_ATTR_COLD;
    static void traceInitThis__1(VoutFile__Syms* __restrict vlSymsp, VerilatedVcd* vcdp, uint32_t code) VL_ATTR_COLD;
    static void traceInit(VerilatedVcd* vcdp, void* userthis, uint32_t code);
    static void traceFull(VerilatedVcd* vcdp, void* userthis, uint32_t code);
    static void traceChg(VerilatedVcd* vcdp, void* userthis, uint32_t code);
} VL_ATTR_ALIGNED(VL_CACHE_LINE_BYTES);

//----------


#endif  // guard
