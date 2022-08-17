module mux4
    #(parameter N = 1) (
        input [N-1:0] in_a, in_b, in_c, in_d,
        input [1:0] sel,
        output reg [N-1:0] out
    );

always @(*) begin
    case(sel)
        'b00: out = in_a;
        'b01: out = in_b;
        'b10: out = in_c;
        'b11: out = in_d;
    endcase
end
endmodule