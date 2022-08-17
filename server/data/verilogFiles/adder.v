module adder(in_a, in_b, out);

parameter N = 8;

input [1:0] in_a, in_b;   // input [N-1:0] in_a, in_b;
output [1:0] out;         // output [N-1:0] out;

assign out = in_a + in_b;

endmodule