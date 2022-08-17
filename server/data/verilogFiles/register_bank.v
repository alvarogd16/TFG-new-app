// Register bank with read and write simultaneous
// DW = Data Width
// AW = Addres Width (How many registers have)
module register_bank
    #(parameter DW = 8,
                AW = 2) 
    (
        input [DW-1:0] in,
        input ld, clk,
        input [AW-1:0] addr_R,
        input [AW-1:0] addr_W,
        output reg [DW-1:0] out);

localparam N_REGS = 2 ** AW;

reg [DW-1:0] data [0:N_REGS-1];

integer i;

initial begin
    for (i = 0; i < N_REGS; i = i + 1) begin
        data[i] = 0;
    end
end

always @(posedge clk) begin
    if(ld && addr_W != 0)
        data[addr_W] <= in;
    out <= data[addr_R];
end
endmodule