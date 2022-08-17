// AW = Address Width
// DW = Data Width
// Ram size = 2^AW * DW
module ram #(
        parameter AW = 5, 
                    DW = 8, 
                    ROM_FILE = "../mem_files/rom_test.mem") 
        (
            input clk, w,
            input [AW-1:0] addr,
            input [DW-1:0] data_in,
            output reg [DW-1:0] data_out);

localparam NPOS = 2 ** AW;

reg [DW-1:0] data [0:NPOS-1];

always @(posedge clk) begin
    if(w)
        data[addr] <= data_in;
    data_out <= data[addr];
end

initial begin
    $readmemh(ROM_FILE, data);
end
endmodule