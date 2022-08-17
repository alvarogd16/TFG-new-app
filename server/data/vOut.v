`include "./verilogFiles/mux2.v"
`include "./verilogFiles/register.v"

module main_1658760333101 (input clk);

//-----------------------------
//--- Intermediate signals ----
//-----------------------------

//---- Outputs ----
wire [0:0] MUX2_out;
wire [0:0] R1_out;
wire [0:0] PC_out;
wire [0:0] ROUT_out;
wire [0:0] RCOND_out;
//---- Inputs ----
wire [0:0] ROUT_ld;
wire [0:0] MUX2_sel;

//---------------------------
//----- Module Instances ----
//---------------------------

mux2 MUX2 (
	.in_a(R1_out),
	.in_b(PC_out),
	.sel(MUX2_sel),
	.out(MUX2_out)
);

register R1 (
	.in(MUX2_1_out),
	.clk(clk),
	.out(R1_out)
);

register PC (
	.clk(clk),
	.out(PC_out)
);

register ROUT (
	.in(MUX2_out),
	.ld(ROUT_ld),
	.clk(clk),
	.out(ROUT_out)
);

register RCOND (
	.clk(clk),
	.out(RCOND_out)
);

//-------------------
//----- CONTROL -----
//-------------------

reg [1:0] nextState;
reg [1:0] state = 0;

reg [1:0] outSignals;

assign { ROUT_ld, MUX2_sel } = outSignals;

always @(posedge clk)
	state <= nextState;

always @(*)
begin
	case(state)
		0:
			outSignals = { 1'b1, 1'b1 };
		1:
			outSignals = { 1'b1, 1'b0 };
		2:
			outSignals = { 1'b1, 1'b1 };
		3:
			outSignals = { 1'b1, 1'b1 };
	endcase
end

always @(*)
begin
	case(state)
		0:
			case(RCOND_out)
				0:
					nextState = 1;
				1:
					nextState = 2;
				default:
					nextState = 3;
			endcase
		1:
			nextState = 0;
		2:
			nextState = 0;
		3:
			nextState = 0;
	endcase
end

endmodule