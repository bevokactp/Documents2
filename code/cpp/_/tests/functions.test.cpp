#include <gtest/gtest.h>
#include "../src/functions.h"

TEST(FunctionTest, Add2) {
    EXPECT_EQ(add2(1, 1), 2);
    EXPECT_EQ(add2(2, 2), 4);
    EXPECT_EQ(add2(0, 0), 0);
    EXPECT_EQ(add2(-1, -1), -3);
}
