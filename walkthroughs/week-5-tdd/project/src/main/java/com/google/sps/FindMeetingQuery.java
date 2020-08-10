// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// First, we are going to discard every event such that no employee from MeetingRequest is a
// participant.
// We can think of an event as a segment in which a no of our employees from the meeting are busy.
// We need to find segments between the given segments in which all of our employees from
// MeeetingRequest are free
// Now, we can think of a segment as a 2 events pair : the first event, when the segment starts, is
// an event that makes
// some of our employees busy, and the second, when the segment ends, makes them free.
// Now, we have some point-events in our timeline, and we need to find the segments between them
// such that everyone is free
// So, we can sort our points by their timestamp and iterate through them.
// When we find a beginning point, we make a no of employees busy and when we find an ending point
// we make them free.
// Everytime when no of busy employees is 0, we check if the next point-event is far enough that we
// can hold the meeting beginning
// from that timestamp.

package com.google.sps;

import java.util.Arrays;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public final class FindMeetingQuery {
  public Collection<TimeRange> query(Collection<Event> events, MeetingRequest request) {
    if (request.getDuration() > 1440) return Arrays.asList();
 
    // this will be our answer.
    Collection<TimeRange> ans = new ArrayList<TimeRange>();
 
    // keep a set with the participants in our meeting
    Set<String> participatingSet = new HashSet<>();
    // the points we are going to iterate through
    List<SegmentPoints> points = new ArrayList<SegmentPoints>();
 
    for (String name : request.getAttendees()) participatingSet.add(name);
    if (participatingSet.size() == 0) return Arrays.asList(TimeRange.WHOLE_DAY);
    // discarding every event that doesn't meet the above req
    // also, adding SegmentPoints if the event is valid
    for (Event event : events) {
      int noParticipants = 0;
      for (String name : event.getAttendees()) {
        if (participatingSet.contains(name)) noParticipants += 1;
      }
    // this means that this event matters for the planning of our meeting
    // we need to add 2 points, the beginning and the ending of the segment
      if (noParticipants != 0) {
        SegmentPoints auxPointBegin =
          new SegmentPoints(noParticipants, true, event.getWhen().start());
        SegmentPoints auxPointEnd = new SegmentPoints(noParticipants, false, event.getWhen().end());
          points.add(auxPointEnd);
          points.add(auxPointBegin);
      }
    }
    // adding 2 more events, one at the beginning of the work program to make everyone free
    // (everybody gets to the job)
    // and one at the ending of the work schedule, to make everyone busy (everybody leaves)
    SegmentPoints auxPointBegin =
        new SegmentPoints(participatingSet.size(), false, TimeRange.getTimeInMinutes(0, 0));
    SegmentPoints auxPointEnd = new SegmentPoints(participatingSet.size(), true, 1440);
    points.add(auxPointEnd);
    points.add(auxPointBegin);

    // now we have all of our point-events in points. We need to sort them by the following criteria
    // we sort by their timestamp, and if equal, a makesBusy event comes second

    Collections.sort(points);

    int noFreeEmployees =
        0; // how many employees are free (before the program starts they are 0 free)
    int noEmployees = participatingSet.size(); // how many employees are attending

    for (int i = 0; i < points.size() - 1; i++) {
      SegmentPoints point = points.get(i);
      if (point.getMakesBusy() == false) {
        noFreeEmployees += point.getNoParticipants();
      } else {
        noFreeEmployees -= point.getNoParticipants();
      }
      if (noFreeEmployees == noEmployees) {
        if (points.get(i + 1).getTime() - point.getTime() >= request.getDuration()) {
          // add every valid timestamp to the collection
          ans.add(
              TimeRange.fromStartDuration(
                  point.getTime(), points.get(i + 1).getTime() - point.getTime()));
        }
      }
    }
    return ans;
// Complexity of the algorithm: O(nlogn), where n is the number of events
  }
}
