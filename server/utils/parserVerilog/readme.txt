This parser get an object with the module name, parameters and ports of a Verilog file. Its create by alvarogd16

The parser suposes that the Verilog its correct. You can check with iverilog tool (http://iverilog.icarus.com/)

By now the parser not support all the Verilog (I think never will be)

/* INCLUDED */
 - module name
 - parameters:
    - old - parameter N = 5
    - new - in module definition #(parameter N = 5)

    - simple    - parameter N = 5
    - multiple  - parameter N = 5, M = 6, P = 0

    - data types - parameter N = 5, greetins = "hola!", f_value = 1.54
    - bases      - parameter sel = 3'b010, data = 8hAF, index = 32'd0, oct = 5'o052

    /* NOT INCLUDED */
    // Soon
    - size              - parameter [4:0] N = 5
    // More trickie
    - size with param   - parameter [WIDTH:0] N = 5

- ports:
    - input  - input in;
    - output - output out;

    - input types: 
        - wire (by default) - input wire in;

    - output types:
        - wire (by default) - output wire out;
        - reg               - output reg out;

    - old - input in_a, in_b; 
            output out;
    - new - in module definition (input in_a, in_b, output out);

    - simple    - input in;
    - multiple  - input a, b, c, d;

    - size  - input [4:0] in

    /* NOT INCLUDED */
    // Soon
    - size with param   - input [WIDTH:0] in

    // Not by now
    - inout
    - signed

/* NOT INCLUDED */
 - All $type functions

/* TO INCLUDE */ 
- Math functions (priority $clog2 because its the most used)