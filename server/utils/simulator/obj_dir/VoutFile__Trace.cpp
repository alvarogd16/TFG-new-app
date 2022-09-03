// Verilated -*- C++ -*-
// DESCRIPTION: Verilator output: Tracing implementation internals
#include "verilated_vcd_c.h"
#include "VoutFile__Syms.h"


//======================

void VoutFile::traceChg(VerilatedVcd* vcdp, void* userthis, uint32_t code) {
    // Callback from vcd->dump()
    VoutFile* t = (VoutFile*)userthis;
    VoutFile__Syms* __restrict vlSymsp = t->__VlSymsp;  // Setup global symbol table
    if (vlSymsp->getClearActivity()) {
        t->traceChgThis(vlSymsp, vcdp, code);
    }
}

//======================


void VoutFile::traceChgThis(VoutFile__Syms* __restrict vlSymsp, VerilatedVcd* vcdp, uint32_t code) {
    VoutFile* __restrict vlTOPp VL_ATTR_UNUSED = vlSymsp->TOPp;
    int c = code;
    if (0 && vcdp && c) {}  // Prevent unused
    // Body
    {
        if (VL_UNLIKELY((1U & (vlTOPp->__Vm_traceActivity 
                               | (vlTOPp->__Vm_traceActivity 
                                  >> 1U))))) {
            vlTOPp->traceChgThis__2(vlSymsp, vcdp, code);
        }
        if (VL_UNLIKELY((2U & vlTOPp->__Vm_traceActivity))) {
            vlTOPp->traceChgThis__3(vlSymsp, vcdp, code);
        }
        vlTOPp->traceChgThis__4(vlSymsp, vcdp, code);
    }
    // Final
    vlTOPp->__Vm_traceActivity = 0U;
}

void VoutFile::traceChgThis__2(VoutFile__Syms* __restrict vlSymsp, VerilatedVcd* vcdp, uint32_t code) {
    VoutFile* __restrict vlTOPp VL_ATTR_UNUSED = vlSymsp->TOPp;
    int c = code;
    if (0 && vcdp && c) {}  // Prevent unused
    // Body
    {
        vcdp->chgBus(c+1,(vlTOPp->main_1661181246997__DOT__nextState),2);
        vcdp->chgBus(c+9,(vlTOPp->main_1661181246997__DOT__state),2);
        vcdp->chgBus(c+17,(vlTOPp->main_1661181246997__DOT__outSignals),2);
    }
}

void VoutFile::traceChgThis__3(VoutFile__Syms* __restrict vlSymsp, VerilatedVcd* vcdp, uint32_t code) {
    VoutFile* __restrict vlTOPp VL_ATTR_UNUSED = vlSymsp->TOPp;
    int c = code;
    if (0 && vcdp && c) {}  // Prevent unused
    // Body
    {
        vcdp->chgBit(c+25,(vlTOPp->main_1661181246997__DOT__R2_out));
        vcdp->chgBit(c+33,(((IData)(vlTOPp->main_1661181246997__DOT__MUX2a__DOT__sel)
                             ? (IData)(vlTOPp->main_1661181246997__DOT__R2_out)
                             : (IData)(vlTOPp->main_1661181246997__DOT__MUX2a__DOT__in_a))));
    }
}

void VoutFile::traceChgThis__4(VoutFile__Syms* __restrict vlSymsp, VerilatedVcd* vcdp, uint32_t code) {
    VoutFile* __restrict vlTOPp VL_ATTR_UNUSED = vlSymsp->TOPp;
    int c = code;
    if (0 && vcdp && c) {}  // Prevent unused
    // Body
    {
        vcdp->chgBit(c+41,(vlTOPp->clk));
        vcdp->chgBit(c+49,(vlTOPp->MUX2_out));
        vcdp->chgBit(c+57,(vlTOPp->R1_out));
        vcdp->chgBit(c+65,(vlTOPp->PC_out));
        vcdp->chgBit(c+73,(vlTOPp->ROUT_out));
        vcdp->chgBit(c+81,(vlTOPp->RCOND_out));
        vcdp->chgBit(c+89,(vlTOPp->ROUT_ld));
        vcdp->chgBit(c+97,(vlTOPp->MUX2_sel));
    }
}
