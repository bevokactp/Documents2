
#include <math.h>
#include <stdbool.h>
#include <stdio.h>


const double eps = 1e-14;


double double_me(double x) {
    return x * x;
}


bool within(double x1, double y1, double x2, double y2, double x, double y) {
    double distance_between_edgs_points = sqrt(double_me(x2 - x1) + double_me(y2 - y1));    
    double distance_from_point_to_one_end = sqrt(double_me(x - x1) + double_me(y - y1));
    double distance_from_point_to_second_end = sqrt(double_me(x2 - x) + double_me(y2 - y));
    double delta = distance_between_edgs_points - distance_from_point_to_one_end - distance_from_point_to_second_end;
    return fabs(delta) < eps;   // true if delta is less than a small tolerance
}


int rxy(double x1, double y1, double x2, double y2, double x, double y, bool segment) {
    if (!segment || within(x1, y1, x2, y2, x, y)) {
        printf("(%g %g)", x, y);
        return 1;
    } else {
        return 0;
    }
}


double fx(double A, double B, double C, double x) {
    return -(A * x + C) / B;
}


double fy(double A, double B, double C, double y) {
    return -(B * y + C) / A;
}


void find_points_ontersection_line_and_circle(double x1, double y1, double x2, double y2, double x0, double y0, double radius, bool segment) {
    double A = y2 - y1;
    double B = x1 - x2;
    double C = x2 * y1 - x1 * y2;
    double a = double_me(A) + double_me(B);
    double b, c, discriminant;
    bool bnz = true;
    int cnt = 0;

    if (fabs(B) >= eps) {
        // if B isn't zero or close to it
        b = 2 * (A * C + A * B * y0 - double_me(B) * x0);
        c = double_me(C) + 2 * B * C * y0 - double_me(B) * (double_me(radius) - double_me(x0) - double_me(y0));
    } else {
        b = 2 * (B * C + A * B * x0 - double_me(A) * y0);
        c = double_me(C) + 2 * A * C * x0 - double_me(A) * (double_me(radius) - double_me(x0) - double_me(y0));
        bnz = false;
    }
    discriminant = double_me(b) - 4 * a * c; // 
    if (discriminant < 0) {
        // line & circle don't intersect
        printf("[]");
        return;
    }

    if (discriminant == 0) {
        // line is tangent to circle, so just one intersect at most
        if (bnz) {
            double x = -b / (2 * a);
            double y = fx(A, B, C, x);
            cnt = rxy(x1, y1, x2, y2, x, y, segment);
        } else {
            double y = -b / (2 * a);
            double x = fy(A, B, C, y);
            cnt = rxy(x1, y1, x2, y2, x, y, segment);
        }
    } else {
        // two intersects at most
        discriminant = sqrt(discriminant);
        if (bnz) {
            double x = (-b + discriminant) / (2 * a);
            double y = fx(A, B, C, x);
            cnt = rxy(x1, y1, x2, y2, x, y, segment);

            x = (-b - discriminant) / (2 * a);
            y = fx(A, B, C, x);
            cnt += rxy(x1, y1, x2, y2, x, y, segment);
        } else {
            double y = (-b + discriminant) / (2 * a);
            double x = fy(A, B, C, y);
            cnt = rxy(x1, y1, x2, y2, x, y, segment);

            y = (-b - discriminant) / (2 * a);
            x = fy(A, B, C, y);
            cnt += rxy(x1, y1, x2, y2, x, y, segment);
        }
    }

    if (cnt <= 0) {
        printf("[]");
    }
}
