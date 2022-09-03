// Verilated -*- C++ -*-
// DESCRIPTION: Verilator output: Tracing implementation internals
#include "verilated_vcd_c.h"
#include "VoutFile__Syms.h"


//======================

void VoutFile::trace(VerilatedVcdC* tfp, int, int) {
    tfp->spTrace()->addCallback(&VoutFile::traceInit, &VoutFile::traceFull, &VoutFile::traceChg, this);
}
void VoutFile::traceInit(VerilatedVcd* vcdp, void* userthis, uint32_t code) {
    // Callback from vcd->open()
    VoutFile* t = (VoutFile*)userthis;
    VoutFile__Syms* __restrict vlSymsp = t->__VlSymsp;  // Setup global symbol table
    if (!Verilated::calcUnusedSigs()) {
        VL_FATAL_MT(__FILE__, __LINE__, __FILE__,
                        "Turning on wave traces requires Verilated::traceEverOn(true) call before time 0.");
    }
    vcdp->scopeEscape(' ');
    t->traceInitThis(vlSymsp, vcdp, code);
    vcdp->scopeEscape('.');
}
void VoutFile::traceFull(VerilatedVcd* vcdp, void* userthis, uint32_t code) {
    // Callback from vcd->dump()
    VoutFile* t = (VoutFile*)userthis;
    VoutFile__Syms* __restrict vlSymsp = t->__VlSymsp;  // Setup global symbol table
    t->traceFullThis(vlSymsp, vcdp, code);
}

//======================


void VoutFile::traceInitThis(VoutFile__Syms* __restrict vlSymsp, VerilatedVcd* vcdp, uint32_t code) {
    VoutFile* __restrict vlTOPp VL_ATTR_UNUSED = vlSymsp->TOPp;
    int c = code;
    if (0 && vcdp && c) {}  // Prevent unused
    vcdp->module(vlSymsp->name());  // Setup signal names
    // Body
    {
        vlTOPp->traceInitThis__1(vlSymsp, vcdp, code);
    }
}

void VoutFile::traceFullThis(VoutFile__Syms* __restrict vlSymsp, VerilatedVcd* vcdp, uint32_t code) {
    VoutFile* __restrict vlTOPp VL_ATTR_UNUSED = vlSymsp->TOPp;
    int c = code;
    if (0 && vcdp && c) {}  // Prevent unused
    // Body
    {
        vlTOPp->traceFullThis__1(vlSymsp, vcdp, code);
    }
    // Final
    vlTOPp->__Vm_traceActivity = 0U;
}

void VoutFile::traceInitThis__1(VoutFile__Syms* __restrict vlSymsp, VerilatedVcd* vcdp, uint32_t code) {
    VoutFile* __restrict vlTOPp VL_ATTR_UNUSED = vlSymsp->TOPp;
    int c = code;
    if (0 && vcdp && c) {}  // Prevent unused
    // Body
    {
        vcdp->declBit(c+41,"clk", false,-1);
        vcdp->declBus(c+49,"MUX2_out", false,-1, 0,0);
        vcdp->declBus(c+57,"R1_out", false,-1, 0,0);
        vcdp->declBus(c+65,"PC_out", false,-1, 0,0);
        vcdp->declBus(c+73,"ROUT_out", false,-1, 0,0);
        vcdp->declBus(c+81,"RCOND_out", false,-1, 0,0);
        vcdp->declBus(c+89,"ROUT_ld", false,-1, 0,0);
        vcdp->declBus(c+97,"MUX2_sel", false,-1, 0,0);
        vcdp->declBit(c+41,"main_1661181246997 clk", false,-1);
        vcdp->declBus(c+49,"main_1661181246997 MUX2_out", false,-1, 0,0);
        vcdp->declBus(c+57,"main_1661181246997 R1_out", false,-1, 0,0);
        vcdp->declBus(c+65,"main_1661181246997 PC_out", false,-1, 0,0);
        vcdp->declBus(c+73,"main_1661181246997 ROUT_out", false,-1, 0,0);
        vcdp->declBus(c+81,"main_1661181246997 RCOND_out", false,-1, 0,0);
        vcdp->declBus(c+89,"main_1661181246997 ROUT_ld", false,-1, 0,0);
        vcdp->declBus(c+97,"main_1661181246997 MUX2_sel", false,-1, 0,0);
        vcdp->declBus(c+1,"main_1661181246997 nextState", false,-1, 1,0);
        vcdp->declBus(c+9,"main_1661181246997 state", false,-1, 1,0);
        vcdp->declBus(c+17,"main_1661181246997 outSignals", false,-1, 1,0);
        vcdp->declBit(c+25,"main_1661181246997 R2_out", false,-1);
        vcdp->declBit(c+33,"main_1661181246997 MUX2a_out", false,-1);
        vcdp->declBus(c+105,"main_1661181246997 MUX2 N", false,-1, 31,0);
        vcdp->declBus(c+57,"main_1661181246997 MUX2 in_a", false,-1, 0,0);
        vcdp->declBus(c+65,"main_1661181246997 MUX2 in_b", false,-1, 0,0);
        vcdp->declBit(c+97,"main_1661181246997 MUX2 sel", false,-1);
        vcdp->declBus(c+49,"main_1661181246997 MUX2 out", false,-1, 0,0);
        vcdp->declBus(c+105,"main_1661181246997 R1 N", false,-1, 31,0);
        vcdp->declBus(c+113,"main_1661181246997 R1 in", false,-1, 0,0);
        vcdp->declBit(c+121,"main_1661181246997 R1 ld", false,-1);
        vcdp->declBit(c+41,"main_1661181246997 R1 clk", false,-1);
        vcdp->declBus(c+57,"main_1661181246997 R1 out", false,-1, 0,0);
        vcdp->declBus(c+105,"main_1661181246997 PC N", false,-1, 31,0);
        vcdp->declBus(c+129,"main_1661181246997 PC in", false,-1, 0,0);
        vcdp->declBit(c+137,"main_1661181246997 PC ld", false,-1);
        vcdp->declBit(c+41,"main_1661181246997 PC clk", false,-1);
        vcdp->declBus(c+65,"main_1661181246997 PC out", false,-1, 0,0);
        vcdp->declBus(c+105,"main_1661181246997 ROUT N", false,-1, 31,0);
        vcdp->declBus(c+49,"main_1661181246997 ROUT in", false,-1, 0,0);
        vcdp->declBit(c+89,"main_1661181246997 ROUT ld", false,-1);
        vcdp->declBit(c+41,"main_1661181246997 ROUT clk", false,-1);
        vcdp->declBus(c+73,"main_1661181246997 ROUT out", false,-1, 0,0);
        vcdp->declBus(c+105,"main_1661181246997 MUX2a N", false,-1, 31,0);
        vcdp->declBus(c+145,"main_1661181246997 MUX2a in_a", false,-1, 0,0);
        vcdp->declBus(c+25,"main_1661181246997 MUX2a in_b", false,-1, 0,0);
        vcdp->declBit(c+153,"main_1661181246997 MUX2a sel", false,-1);
        vcdp->declBus(c+33,"main_1661181246997 MUX2a out", false,-1, 0,0);
        vcdp->declBus(c+105,"main_1661181246997 R2 N", false,-1, 31,0);
        vcdp->declBus(c+161,"main_1661181246997 R2 in", false,-1, 0,0);
        vcdp->declBit(c+169,"main_1661181246997 R2 ld", false,-1);
        vcdp->declBit(c+41,"main_1661181246997 R2 clk", false,-1);
        vcdp->declBus(c+25,"main_1661181246997 R2 out", false,-1, 0,0);
    }
}

void VoutFile::traceFullThis__1(VoutFile__Syms* __restrict vlSymsp, VerilatedVcd* vcdp, uint32_t code) {
    VoutFile* __restrict vlTOPp VL_ATTR_UNUSED = vlSymsp->TOPp;
    int c = code;
    if (0 && vcdp && c) {}  // Prevent unused
    // Body
    {
        vcdp->fullBus(c+1,(vlTOPp->main_1661181246997__DOT__nextState),2);
        vcdp->fullBus(c+9,(vlTOPp->main_1661181246997__DOT__state),2);
        vcdp->fullBus(c+17,(vlTOPp->main_1661181246997__DOT__outSignals),2);
        vcdp->fullBit(c+25,(vlTOPp->main_1661181246997__DOT__R2_out));
        vcdp->fullBit(c+33,(((IData)(vlTOPp->main_1661181246997__DOT__MUX2a__DOT__sel)
                              ? (IData)(vlTOPp->main_1661181246997__DOT__R2_out)
                              : (IData)(vlTOPp->main_1661181246997__DOT__MUX2a__DOT__in_a))));
        vcdp->fullBit(c+41,(vlTOPp->clk));
        vcdp->fullBit(c+49,(vlTOPp->MUX2_out));
        vcdp->fullBit(c+57,(vlTOPp->R1_out));
        vcdp->fullBit(c+65,(vlTOPp->PC_out));
        vcdp->fullBit(c+73,(vlTOPp->ROUT_out));
        vcdp->fullBit(c+81,(vlTOPp->RCOND_out));
        vcdp->fullBit(c+89,(vlTOPp->ROUT_ld));
        vcdp->fullBit(c+97,(vlTOPp->MUX2_sel));
        vcdp->fullBus(c+105,(1U),32);
        vcdp->fullBit(c+113,(vlTOPp->main_1661181246997__DOT__R1__DOT__in));
        vcdp->fullBit(c+121,(vlTOPp->main_1661181246997__DOT__R1__DOT__ld));
        vcdp->fullBit(c+129,(vlTOPp->main_1661181246997__DOT__PC__DOT__in));
        vcdp->fullBit(c+137,(vlTOPp->main_1661181246997__DOT__PC__DOT__ld));
        vcdp->fullBit(c+145,(vlTOPp->main_1661181246997__DOT__MUX2a__DOT__in_a));
        vcdp->fullBit(c+153,(vlTOPp->main_1661181246997__DOT__MUX2a__DOT__sel));
        vcdp->fullBit(c+161,(vlTOPp->main_1661181246997__DOT__R2__DOT__in));
        vcdp->fullBit(c+169,(vlTOPp->main_1661181246997__DOT__R2__DOT__ld));
    }
}
