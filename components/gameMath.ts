

export function point_direction (x1:number,y1:number,x2:number,y2:number): number {
    const p1 = {
        x:x1,
        y:y1
    }
    const p2 = {
        x:x2,
        y:y2
    }
    return (calculate_angle(p1.x,p1.y,p2.x,p2.y)*180)/Math.PI
}

export function calculate_angle(x1:number,y1:number,x2:number,y2:number): number {
    const p1 = {
        x:x1,
        y:y1
    }
    const p2 = {
        x:x2,
        y:y2
    }
    if (p2.x > p1.x) {
        // quad 1 or 2
        if (p2.y > p1.y) {
            // quad 2
            return arctan(p1.x,p1.y,p2.x,p2.y)}
            // should be 1-90
        else {
            if (p2.y==p1.y) {
                return 0}
            else {
                // quad 1
                return 2*Math.PI+arctan(p1.x,p1.y,p2.x,p2.y)
                // 270-360
            }
        }
    }
    else {    
        if (p2.x==p1.x) {
            // atan undefined
            if (p2.y == p1.y) {
                return 0}
            else {
                if (p2.y > p1.y) {
                    return Math.PI/2}
                else {
                    return 1.5*Math.PI
                }
            }
        }
        else {
            // else { p2.x < p1.x
            // quad 3 or 4
            if (p2.y == p1.y) {
                return Math.PI}
            else {
                if (p2.y > p1.y) {
                    // quad 3
                    return Math.PI + arctan(p1.x,p1.y,p2.x,p2.y)
                }
                    // 90-180
                else {
                    // quad 4
                    return Math.PI+ arctan(p1.x,p1.y,p2.x,p2.y)
                    // 180-270
                }
            }
        }
    }
}

export function arctan (x1:number,y1:number,x2:number,y2:number): number {
    // Returns the arcTan of points p1 and p2.
    const p1 = {
        x:x1,
        y:y1
    }
    const p2 = {
        x:x2,
        y:y2
    }
    let rat=  (p2.y-p1.y)/(p2.x-p1.x)
    let inradians=Math.atan(rat)
    //indegrees=180*inradians/Math.PI
    return inradians
}