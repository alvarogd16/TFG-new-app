// Extends sign bit
//
// 0 ---------> 0
// 1 ---------> 1
// 1 ---------> 1
//    \-------> 1
//     \------> 1
//
// 110 -> 11110
module sign_extender 
    #(
        parameter WIN = 5,
                    WOUT = 8)
    (
        input [WIN-1:0] in,
        output [WOUT-1:0] out);

// Extend bits
localparam EXT_B = WOUT - WIN;

assign out = {{EXT_B{in[WIN-1]}}, in};
endmodule