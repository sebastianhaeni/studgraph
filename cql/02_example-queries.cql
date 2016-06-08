//////////////////////////////////////////////////
// QUERY STATEMENTS
// return all type relationships
MATCH (subject)-[:type]->(type)
RETURN subject, type;
//
// return all assessment relationships
MATCH (subject)-[:assessment]->(assessment)
RETURN subject, assessment;
//
// return all parent-child relationships
MATCH (parent)-[:child]->(child)
RETURN parent, child;
//
// return all dependency relationships
MATCH (before)-[:precedes]->(after)
RETURN before, after;
//
// return all XOR relationships
MATCH (option1)-[:xor]->(option2)
RETURN option1, option2;
//
// return all simultaneous relationships
MATCH (while)-[:simultaneous]->(do)
RETURN while, do;
///////////////////////////////////////////////
