// AW = Address Width
// DW = Data Width
// Rom size = 2^AW * DW
module rom #(
        parameter AW = 5, 
                    DW = 8, 
                    ROM_FILE = "../mem_files/rom_test.mem") 
        (
            input clk,
            input [AW-1:0] addr,
            output reg [DW-1:0] data_out);

localparam NPOS = 2 ** AW;

reg [DW-1:0] data [0:NPOS-1];

always @(posedge clk) begin
    data_out <= data[addr];
end

initial begin
    $readmemh(ROM_FILE, data);
end
endmodule