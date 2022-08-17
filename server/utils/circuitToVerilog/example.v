module prueba();

reg clk = 0;
reg [1:0] next_state;
reg [1:0] state = 2'b00;

reg a = 0, b = 0;

wire [1:0] cond_sig = { a, b };

always # 0.5 clk = ~clk;

always @(posedge clk)
    state <= next_state;

always @(*)
begin
    case(state)
        0:
            outSignals = { 0, 1 };
    endcase
end

always @(*)
begin
    next_state = state;
    case(state)
        2'b00: 
            case(cond_sig)
                2'b00: next_state = 2'b10;
                2'b11: next_state = 2'b01;
            endcase
        2'b01: next_state = 2'b00;
        2'b10: next_state = 2'b01;
    endcase
end

initial begin
    $dumpfile("example.vcd");
    $dumpvars(0, prueba);

    #10;
    a = 1;
    b = 1;
    #10;
    $finish();
end

endmodule