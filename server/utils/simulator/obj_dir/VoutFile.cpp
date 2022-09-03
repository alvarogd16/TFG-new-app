// Verilated -*- C++ -*-
// DESCRIPTION: Verilator output: Design implementation internals
// See VoutFile.h for the primary calling header

#include "VoutFile.h"
#include "VoutFile__Syms.h"

//==========
CData/*1:0*/ VoutFile::__Vtable1_main_1661181246997__DOT__nextState[8];

VL_CTOR_IMP(VoutFile) {
    VoutFile__Syms* __restrict vlSymsp = __VlSymsp = new VoutFile__Syms(this, name());
    VoutFile* __restrict vlTOPp VL_ATTR_UNUSED = vlSymsp->TOPp;
    // Reset internal values
    
    // Reset structure values
    _ctor_var_reset();
}

void VoutFile::__Vconfigure(VoutFile__Syms* vlSymsp, bool first) {
    if (0 && first) {}  // Prevent unused
    this->__VlSymsp = vlSymsp;
}

VoutFile::~VoutFile() {
    delete __VlSymsp; __VlSymsp=NULL;
}

void VoutFile::eval() {
    VL_DEBUG_IF(VL_DBG_MSGF("+++++TOP Evaluate VoutFile::eval\n"); );
    VoutFile__Syms* __restrict vlSymsp = this->__VlSymsp;  // Setup global symbol table
    VoutFile* __restrict vlTOPp VL_ATTR_UNUSED = vlSymsp->TOPp;
#ifdef VL_DEBUG
    // Debug assertions
    _eval_debug_assertions();
#endif  // VL_DEBUG
    // Initialize
    if (VL_UNLIKELY(!vlSymsp->__Vm_didInit)) _eval_initial_loop(vlSymsp);
    // Evaluate till stable
    int __VclockLoop = 0;
    QData __Vchange = 1;
    do {
        VL_DEBUG_IF(VL_DBG_MSGF("+ Clock loop\n"););
        vlSymsp->__Vm_activity = true;
        _eval(vlSymsp);
        if (VL_UNLIKELY(++__VclockLoop > 100)) {
            // About to fail, so enable debug to see what's not settling.
            // Note you must run make with OPT=-DVL_DEBUG for debug prints.
            int __Vsaved_debug = Verilated::debug();
            Verilated::debug(1);
            __Vchange = _change_request(vlSymsp);
            Verilated::debug(__Vsaved_debug);
            VL_FATAL_MT("/home/alvaro/Documents/Programaci\303\263n/react/new-app/server/data/outFile.v", 7, "",
                "Verilated model didn't converge\n"
                "- See DIDNOTCONVERGE in the Verilator manual");
        } else {
            __Vchange = _change_request(vlSymsp);
        }
    } while (VL_UNLIKELY(__Vchange));
}

void VoutFile::_eval_initial_loop(VoutFile__Syms* __restrict vlSymsp) {
    vlSymsp->__Vm_didInit = true;
    _eval_initial(vlSymsp);
    vlSymsp->__Vm_activity = true;
    // Evaluate till stable
    int __VclockLoop = 0;
    QData __Vchange = 1;
    do {
        _eval_settle(vlSymsp);
        _eval(vlSymsp);
        if (VL_UNLIKELY(++__VclockLoop > 100)) {
            // About to fail, so enable debug to see what's not settling.
            // Note you must run make with OPT=-DVL_DEBUG for debug prints.
            int __Vsaved_debug = Verilated::debug();
            Verilated::debug(1);
            __Vchange = _change_request(vlSymsp);
            Verilated::debug(__Vsaved_debug);
            VL_FATAL_MT("/home/alvaro/Documents/Programaci\303\263n/react/new-app/server/data/outFile.v", 7, "",
                "Verilated model didn't DC converge\n"
                "- See DIDNOTCONVERGE in the Verilator manual");
        } else {
            __Vchange = _change_request(vlSymsp);
        }
    } while (VL_UNLIKELY(__Vchange));
}

void VoutFile::_initial__TOP__1(VoutFile__Syms* __restrict vlSymsp) {
    VL_DEBUG_IF(VL_DBG_MSGF("+    VoutFile::_initial__TOP__1\n"); );
    VoutFile* __restrict vlTOPp VL_ATTR_UNUSED = vlSymsp->TOPp;
    // Body
    vlTOPp->main_1661181246997__DOT__state = 0U;
}

VL_INLINE_OPT void VoutFile::_sequent__TOP__2(VoutFile__Syms* __restrict vlSymsp) {
    VL_DEBUG_IF(VL_DBG_MSGF("+    VoutFile::_sequent__TOP__2\n"); );
    VoutFile* __restrict vlTOPp VL_ATTR_UNUSED = vlSymsp->TOPp;
    // Body
    if (vlTOPp->main_1661181246997__DOT__R2__DOT__ld) {
        vlTOPp->main_1661181246997__DOT__R2_out = vlTOPp->main_1661181246997__DOT__R2__DOT__in;
    }
    if (vlTOPp->ROUT_ld) {
        vlTOPp->ROUT_out = vlTOPp->MUX2_out;
    }
    if (vlTOPp->main_1661181246997__DOT__PC__DOT__ld) {
        vlTOPp->PC_out = vlTOPp->main_1661181246997__DOT__PC__DOT__in;
    }
    if (vlTOPp->main_1661181246997__DOT__R1__DOT__ld) {
        vlTOPp->R1_out = vlTOPp->main_1661181246997__DOT__R1__DOT__in;
    }
    vlTOPp->main_1661181246997__DOT__state = vlTOPp->main_1661181246997__DOT__nextState;
    vlTOPp->__Vtableidx1 = (((IData)(vlTOPp->RCOND_out) 
                             << 2U) | (IData)(vlTOPp->main_1661181246997__DOT__state));
    vlTOPp->main_1661181246997__DOT__nextState = vlTOPp->__Vtable1_main_1661181246997__DOT__nextState
        [vlTOPp->__Vtableidx1];
    if ((0U == (IData)(vlTOPp->main_1661181246997__DOT__state))) {
        vlTOPp->main_1661181246997__DOT__outSignals = 3U;
    } else {
        if ((1U == (IData)(vlTOPp->main_1661181246997__DOT__state))) {
            vlTOPp->main_1661181246997__DOT__outSignals = 2U;
        } else {
            if ((2U == (IData)(vlTOPp->main_1661181246997__DOT__state))) {
                vlTOPp->main_1661181246997__DOT__outSignals = 3U;
            } else {
                if ((3U == (IData)(vlTOPp->main_1661181246997__DOT__state))) {
                    vlTOPp->main_1661181246997__DOT__outSignals = 3U;
                }
            }
        }
    }
    vlTOPp->ROUT_ld = (1U & ((IData)(vlTOPp->main_1661181246997__DOT__outSignals) 
                             >> 1U));
    vlTOPp->MUX2_sel = (1U & (IData)(vlTOPp->main_1661181246997__DOT__outSignals));
    vlTOPp->MUX2_out = ((IData)(vlTOPp->MUX2_sel) ? (IData)(vlTOPp->PC_out)
                         : (IData)(vlTOPp->R1_out));
}

void VoutFile::_settle__TOP__3(VoutFile__Syms* __restrict vlSymsp) {
    VL_DEBUG_IF(VL_DBG_MSGF("+    VoutFile::_settle__TOP__3\n"); );
    VoutFile* __restrict vlTOPp VL_ATTR_UNUSED = vlSymsp->TOPp;
    // Body
    vlTOPp->__Vtableidx1 = (((IData)(vlTOPp->RCOND_out) 
                             << 2U) | (IData)(vlTOPp->main_1661181246997__DOT__state));
    vlTOPp->main_1661181246997__DOT__nextState = vlTOPp->__Vtable1_main_1661181246997__DOT__nextState
        [vlTOPp->__Vtableidx1];
    if ((0U == (IData)(vlTOPp->main_1661181246997__DOT__state))) {
        vlTOPp->main_1661181246997__DOT__outSignals = 3U;
    } else {
        if ((1U == (IData)(vlTOPp->main_1661181246997__DOT__state))) {
            vlTOPp->main_1661181246997__DOT__outSignals = 2U;
        } else {
            if ((2U == (IData)(vlTOPp->main_1661181246997__DOT__state))) {
                vlTOPp->main_1661181246997__DOT__outSignals = 3U;
            } else {
                if ((3U == (IData)(vlTOPp->main_1661181246997__DOT__state))) {
                    vlTOPp->main_1661181246997__DOT__outSignals = 3U;
                }
            }
        }
    }
    vlTOPp->ROUT_ld = (1U & ((IData)(vlTOPp->main_1661181246997__DOT__outSignals) 
                             >> 1U));
    vlTOPp->MUX2_sel = (1U & (IData)(vlTOPp->main_1661181246997__DOT__outSignals));
    vlTOPp->MUX2_out = ((IData)(vlTOPp->MUX2_sel) ? (IData)(vlTOPp->PC_out)
                         : (IData)(vlTOPp->R1_out));
}

void VoutFile::_eval(VoutFile__Syms* __restrict vlSymsp) {
    VL_DEBUG_IF(VL_DBG_MSGF("+    VoutFile::_eval\n"); );
    VoutFile* __restrict vlTOPp VL_ATTR_UNUSED = vlSymsp->TOPp;
    // Body
    if (((IData)(vlTOPp->clk) & (~ (IData)(vlTOPp->__Vclklast__TOP__clk)))) {
        vlTOPp->_sequent__TOP__2(vlSymsp);
        vlTOPp->__Vm_traceActivity = (2U | vlTOPp->__Vm_traceActivity);
    }
    // Final
    vlTOPp->__Vclklast__TOP__clk = vlTOPp->clk;
}

void VoutFile::_eval_initial(VoutFile__Syms* __restrict vlSymsp) {
    VL_DEBUG_IF(VL_DBG_MSGF("+    VoutFile::_eval_initial\n"); );
    VoutFile* __restrict vlTOPp VL_ATTR_UNUSED = vlSymsp->TOPp;
    // Body
    vlTOPp->_initial__TOP__1(vlSymsp);
    vlTOPp->__Vm_traceActivity = (1U | vlTOPp->__Vm_traceActivity);
    vlTOPp->__Vclklast__TOP__clk = vlTOPp->clk;
}

void VoutFile::final() {
    VL_DEBUG_IF(VL_DBG_MSGF("+    VoutFile::final\n"); );
    // Variables
    VoutFile__Syms* __restrict vlSymsp = this->__VlSymsp;
    VoutFile* __restrict vlTOPp VL_ATTR_UNUSED = vlSymsp->TOPp;
}

void VoutFile::_eval_settle(VoutFile__Syms* __restrict vlSymsp) {
    VL_DEBUG_IF(VL_DBG_MSGF("+    VoutFile::_eval_settle\n"); );
    VoutFile* __restrict vlTOPp VL_ATTR_UNUSED = vlSymsp->TOPp;
    // Body
    vlTOPp->_settle__TOP__3(vlSymsp);
    vlTOPp->__Vm_traceActivity = (1U | vlTOPp->__Vm_traceActivity);
}

VL_INLINE_OPT QData VoutFile::_change_request(VoutFile__Syms* __restrict vlSymsp) {
    VL_DEBUG_IF(VL_DBG_MSGF("+    VoutFile::_change_request\n"); );
    VoutFile* __restrict vlTOPp VL_ATTR_UNUSED = vlSymsp->TOPp;
    // Body
    // Change detection
    QData __req = false;  // Logically a bool
    return __req;
}

#ifdef VL_DEBUG
void VoutFile::_eval_debug_assertions() {
    VL_DEBUG_IF(VL_DBG_MSGF("+    VoutFile::_eval_debug_assertions\n"); );
    // Body
    if (VL_UNLIKELY((clk & 0xfeU))) {
        Verilated::overWidthError("clk");}
}
#endif  // VL_DEBUG

void VoutFile::_ctor_var_reset() {
    VL_DEBUG_IF(VL_DBG_MSGF("+    VoutFile::_ctor_var_reset\n"); );
    // Body
    clk = VL_RAND_RESET_I(1);
    MUX2_out = VL_RAND_RESET_I(1);
    R1_out = VL_RAND_RESET_I(1);
    PC_out = VL_RAND_RESET_I(1);
    ROUT_out = VL_RAND_RESET_I(1);
    RCOND_out = VL_RAND_RESET_I(1);
    ROUT_ld = VL_RAND_RESET_I(1);
    MUX2_sel = VL_RAND_RESET_I(1);
    main_1661181246997__DOT__nextState = VL_RAND_RESET_I(2);
    main_1661181246997__DOT__state = VL_RAND_RESET_I(2);
    main_1661181246997__DOT__outSignals = VL_RAND_RESET_I(2);
    main_1661181246997__DOT__R2_out = VL_RAND_RESET_I(1);
    main_1661181246997__DOT__R1__DOT__in = VL_RAND_RESET_I(1);
    main_1661181246997__DOT__R1__DOT__ld = VL_RAND_RESET_I(1);
    main_1661181246997__DOT__PC__DOT__in = VL_RAND_RESET_I(1);
    main_1661181246997__DOT__PC__DOT__ld = VL_RAND_RESET_I(1);
    main_1661181246997__DOT__MUX2a__DOT__in_a = VL_RAND_RESET_I(1);
    main_1661181246997__DOT__MUX2a__DOT__sel = VL_RAND_RESET_I(1);
    main_1661181246997__DOT__R2__DOT__in = VL_RAND_RESET_I(1);
    main_1661181246997__DOT__R2__DOT__ld = VL_RAND_RESET_I(1);
    __Vtableidx1 = 0;
    __Vtable1_main_1661181246997__DOT__nextState[0] = 1U;
    __Vtable1_main_1661181246997__DOT__nextState[1] = 0U;
    __Vtable1_main_1661181246997__DOT__nextState[2] = 0U;
    __Vtable1_main_1661181246997__DOT__nextState[3] = 0U;
    __Vtable1_main_1661181246997__DOT__nextState[4] = 2U;
    __Vtable1_main_1661181246997__DOT__nextState[5] = 0U;
    __Vtable1_main_1661181246997__DOT__nextState[6] = 0U;
    __Vtable1_main_1661181246997__DOT__nextState[7] = 0U;
    __Vm_traceActivity = 0;
}
