package com.google.sps;

public final class SegmentPoints implements Comparable<SegmentPoints> {
  private int noParticipants;
  private boolean makesBusy; // tells us if the point makes the participants busy or not
  private int time;

  public SegmentPoints(int noParticipants, boolean makesBusy, int time) {
    this.noParticipants = noParticipants;
    this.makesBusy = makesBusy;
    this.time = time;
  }

  public int getNoParticipants() {
    return this.noParticipants;
  }

  public boolean getMakesBusy() {
    return this.makesBusy;
  }

  public int getTime() {
    return this.time;
  }

  @Override
  public int compareTo(SegmentPoints secondPoint) {
    int res1 = this.time - secondPoint.time;
    // if they are equal, the first point is the one that frees employees
    if (res1 == 0) {
	if (this.makesBusy) return 1;
	return -1;
    }
    return res1;
  }
}
