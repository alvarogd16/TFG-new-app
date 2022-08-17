module mux2
    #(parameter N = 1) (
        input [N-1:0] in_a, in_b,
        input sel,
        output [N-1:0] out
    );

assign out = sel ? in_b : in_a;
endmodule